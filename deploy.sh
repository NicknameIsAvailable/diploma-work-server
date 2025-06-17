#!/bin/bash

# === Конфигурация ===
APP_NAME="metrostroy-schedule-server"
APP_DIR="/var/www/$APP_NAME"
REPO_SOURCE_DIR="$PWD"
PORT=8000
DOMAIN="metrostroy-schedule.local"
DB_NAME="metrostroydb"
DB_USER="metrostroy_user"
DB_PASSWORD="secure_password_here"

# === Проверка и установка утилит ===
install_if_missing() {
  if ! command -v "$1" &> /dev/null; then
    echo "📦 Установка $1..."
    eval "$2"
  else
    echo "✅ $1 уже установлен"
  fi
}

sudo apt update

install_if_missing git "sudo apt install git -y"
install_if_missing curl "sudo apt install curl -y"
install_if_missing node "curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt install nodejs -y"
install_if_missing pnpm "npm install -g pnpm"
install_if_missing pm2 "npm install -g pm2"
install_if_missing nginx "sudo apt install nginx -y && sudo systemctl enable nginx && sudo systemctl start nginx"

# === Установка PostgreSQL ===
if ! command -v psql &> /dev/null; then
  echo "📦 Установка PostgreSQL..."
  sudo apt install postgresql postgresql-contrib -y
  sudo systemctl enable postgresql
  sudo systemctl start postgresql

  # Создание пользователя и базы данных
  sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"
  sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"
  sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
else
  echo "✅ PostgreSQL уже установлен"
fi

# === Копирование проекта, если нужно ===
if [ ! -d "$APP_DIR" ]; then
  echo "📁 Копирование проекта в $APP_DIR"
  sudo mkdir -p "$APP_DIR"
  sudo cp -r "$REPO_SOURCE_DIR"/* "$APP_DIR"
  sudo chown -R $USER:$USER "$APP_DIR"
else
  echo "📁 Проект уже есть в $APP_DIR"
fi

# === Переход в директорию ===
cd "$APP_DIR" || exit 1

# === Обновление исходников ===
if [ -d .git ]; then
  echo "🔄 git pull..."
  git pull origin main || exit 1
else
  echo "⚠️  Не git-проект. Пропускаем обновление."
fi

# === Создание production конфигурации ===
echo "🔧 Настройка production окружения..."
cat > .env.production << EOF
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME"
POSTGRES_USER="$DB_USER"
POSTGRES_PASSWORD="$DB_PASSWORD"
POSTGRES_DB="$DB_NAME"
POSTGRES_PORT=5432

APP_PORT=$PORT
NODE_ENV=production

JWT_SECRET=$(openssl rand -base64 32)

CLIENT_URL=http://$DOMAIN

NGINX_PORT=80
NGINX_SSL_PORT=443
EOF

# Создание символической ссылки
ln -sf .env.production .env

# === Установка зависимостей и билд ===
echo "📦 Установка зависимостей..."
pnpm install --frozen-lockfile || exit 1

echo "🔨 Сборка приложения..."
pnpm build || exit 1

# === Миграции базы данных ===
echo "🗄️ Выполнение миграций базы данных..."
npx prisma migrate deploy || exit 1

# === Перезапуск приложения ===
echo "🚀 Перезапуск приложения через PM2..."
pm2 delete $APP_NAME || true
pm2 start "pnpm start:prod" --name $APP_NAME --cwd "$APP_DIR" --env production
pm2 save

# === Настройка Nginx ===
echo "🛠 Конфигурация nginx..."
NGINX_CONF="/etc/nginx/sites-available/$APP_NAME"

sudo tee "$NGINX_CONF" > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    # Static files
    location /public/ {
        alias $APP_DIR/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API routes
    location /api/ {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 300s;
    }

    # Root redirect to API docs
    location = / {
        return 301 /api;
    }
}
EOF

sudo ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/$APP_NAME"
sudo rm -f "/etc/nginx/sites-enabled/default"
sudo nginx -t && sudo systemctl reload nginx

echo "✅ Деплой завершён!"
echo "🌐 Приложение доступно по адресу: http://$DOMAIN"
echo "📚 API документация: http://$DOMAIN/api"
echo "🔍 Проверить статус: pm2 status"
echo "📋 Посмотреть логи: pm2 logs $APP_NAME"

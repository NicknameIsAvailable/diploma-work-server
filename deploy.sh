#!/bin/bash

# === Конфигурация ===
APP_NAME="metrostroy-schedule-server"
APP_DIR="/var/www/$APP_NAME"
REPO_SOURCE_DIR="$PWD"
PORT=8000
DOMAIN="metrostroy-schedule.local"

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

# === Установка Docker ===
if ! command -v docker &> /dev/null; then
  echo "📦 Установка Docker..."
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  sudo usermod -aG docker $USER
  sudo systemctl enable docker
  sudo systemctl start docker
  rm get-docker.sh
else
  echo "✅ Docker уже установлен"
fi

# === Установка Docker Compose ===
if ! command -v docker-compose &> /dev/null; then
  echo "📦 Установка Docker Compose..."
  sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
else
  echo "✅ Docker Compose уже установлен"
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

# Проверяем существование .env файла
if [ ! -f .env ]; then
  echo "❌ .env файл не найден!"
  echo "Создание .env файла с базовыми настройками..."
  cat > .env << EOF
DATABASE_URL="postgresql://metrostroy_user:secure_password@localhost:5432/metrostroydb"
POSTGRES_USER="metrostroy_user"
POSTGRES_PASSWORD="secure_password"
POSTGRES_DB="metrostroydb"

CLIENT_URL="http://$DOMAIN"
JWT_SECRET="$(openssl rand -base64 32)"
EOF
  echo "⚠️  Обновите .env файл с вашими настройками перед продолжением!"
fi

# === Запуск PostgreSQL в Docker ===
echo "🐳 Запуск PostgreSQL через Docker Compose..."
docker-compose down || true
docker-compose up -d

# Ждем пока база данных запустится
echo "⏳ Ожидание запуска базы данных..."
sleep 15

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
echo "🐳 Проверить Docker контейнеры: docker-compose ps"
echo "🔍 Проверить статус приложения: pm2 status"
echo "📋 Посмотреть логи приложения: pm2 logs $APP_NAME"
echo "📋 Посмотреть логи БД: docker-compose logs postgres"

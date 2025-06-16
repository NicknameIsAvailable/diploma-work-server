# Multi-stage build для оптимизации размера образа
FROM node:20-alpine AS dependencies

# Установка pnpm
RUN npm install -g pnpm

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json pnpm-lock.yaml ./

# Устанавливаем только production зависимости
RUN pnpm install --frozen-lockfile --prod

# Стадия для сборки
FROM node:20-alpine AS build

RUN npm install -g pnpm
RUN apk add --no-cache openssl

WORKDIR /app

# Копируем все файлы зависимостей
COPY package.json pnpm-lock.yaml ./

# Устанавливаем все зависимости
RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY . .

# Генерируем Prisma клиент
RUN npx prisma generate

# Собираем приложение
RUN pnpm run build

# Production стадия
FROM node:20-alpine AS production

RUN apk add --no-cache openssl dumb-init

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

WORKDIR /app

# Копируем package.json и prisma schema
COPY --from=build /app/package.json ./
COPY --from=build /app/prisma ./prisma

# Копируем production зависимости
COPY --from=dependencies /app/node_modules ./node_modules

# Копируем собранное приложение
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public

# Создаем директории для загрузок
RUN mkdir -p uploads excel-dumps
RUN chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 8000

# Используем dumb-init для правильной обработки сигналов
ENTRYPOINT ["dumb-init", "--"]

# Скрипт запуска с миграциями
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]

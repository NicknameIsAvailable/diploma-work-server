FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl

# Установка pnpm
RUN npm install -g pnpm

# Копируем package.json и pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Устанавливаем все зависимости (dev + prod)
RUN pnpm install --frozen-lockfile

# Копируем схему Prisma и генерируем клиент
COPY prisma ./prisma
RUN npx prisma generate

# Копируем исходники и билдим проект
COPY . .
RUN pnpm run build

# --- Production stage ---
FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm
RUN apk add --no-cache openssl

COPY package.json pnpm-lock.yaml ./

# Копируем только production зависимости
RUN pnpm install --prod --frozen-lockfile

# Копируем билд, prisma, и сгенерированный клиент
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 8000

CMD ["node", "dist/main"]
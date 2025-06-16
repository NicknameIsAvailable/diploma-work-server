#!/bin/bash

set -e

echo "🚀 Deploying Metrostroy Schedule Server..."

# Проверяем наличие .env.production
if [ ! -f .env.production ]; then
    echo "❌ .env.production file not found!"
    echo "Please create .env.production file with production settings"
    exit 1
fi

# Создаем символическую ссылку на production env
ln -sf .env.production .env

echo "📦 Building Docker images..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

echo "🧹 Cleaning up old images..."
docker image prune -f

echo "🚀 Starting services..."
docker-compose -f docker-compose.prod.yml up -d

echo "⏳ Waiting for services to be healthy..."
sleep 30

echo "🔍 Checking service status..."
docker-compose -f docker-compose.prod.yml ps

echo "📋 Showing logs..."
docker-compose -f docker-compose.prod.yml logs --tail=50

echo "✅ Deployment completed!"
echo "🌐 Your application should be available at: http://localhost:8000/api"
echo "📚 API documentation: http://localhost:8000/api"

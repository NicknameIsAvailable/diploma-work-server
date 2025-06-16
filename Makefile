.PHONY: help build up down logs restart clean deploy-prod

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build the Docker images
	docker-compose -f docker-compose.prod.yml build

up: ## Start the services
	docker-compose -f docker-compose.prod.yml up -d

down: ## Stop the services
	docker-compose -f docker-compose.prod.yml down

logs: ## Show logs
	docker-compose -f docker-compose.prod.yml logs -f

restart: ## Restart the services
	make down
	make up

clean: ## Clean up Docker resources
	docker-compose -f docker-compose.prod.yml down -v
	docker system prune -f
	docker volume prune -f

deploy-prod: ## Deploy to production
	@echo "🚀 Starting production deployment..."
	@if [ ! -f .env.production ]; then \
		echo "❌ .env.production not found! Please create it first."; \
		exit 1; \
	fi
	chmod +x deploy.sh
	./deploy.sh

# Database commands
db-migrate: ## Run database migrations
	docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy

db-seed: ## Seed the database
	docker-compose -f docker-compose.prod.yml exec app npx prisma db seed

db-reset: ## Reset the database
	docker-compose -f docker-compose.prod.yml exec app npx prisma migrate reset --force

# Monitoring commands
status: ## Show service status
	docker-compose -f docker-compose.prod.yml ps

health: ## Check service health
	@echo "Checking application health..."
	@curl -f http://localhost:8000/api || echo "❌ App is not healthy"
	@echo "Checking database health..."
	@docker-compose -f docker-compose.prod.yml exec postgres pg_isready -U $(shell grep POSTGRES_USER .env.production | cut -d '=' -f2)

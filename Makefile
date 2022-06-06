build:
	@docker build -t paper-summerizer-api ./api
	@docker build -t paper-summerizer-app ./app

up:
	@docker compose up -d

down:
	@docker-compose down
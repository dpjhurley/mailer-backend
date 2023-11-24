docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

install-dependencies:
	cd api && npm install && cd ../mailer && npm install

generate-grpc-files:
	cd api && npm run generate:proto-ts && cd ../mailer && npm run generate:proto-ts

all: 
	make docker-build docker-up
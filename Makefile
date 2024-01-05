docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

install-dependencies:
	npm install && cd apigateway && npm install && cd ../mailer && npm install

lint-and-test:
	npm run lint && npm run test

generate-grpc-files:
	npm run generate:proto-ts && mv -r generated apigateway/generated && cp -r apigateway/generated mailer/generated

all: 
	make docker-build docker-up
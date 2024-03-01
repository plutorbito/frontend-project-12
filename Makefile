lint-frontend:
	make -C frontend-project-12-react-app lint

install:
	npm ci

start-frontend:
	make -C frontend-project-12-react-app start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend

build:
	rm frontend-project-12-react-app/build -rf
	npm run build
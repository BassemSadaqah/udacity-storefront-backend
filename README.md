# Storefront Backend API
This project is a RESTful api for an e-commerse website build as a learning-project for udacity.


## Getting started
- Clone the repository
```
git clone https://github.com/BassemSadaqah/udacity-storefront-backend
```
- Install dependencies
```
cd udacity-storefront-backend
npm install
```
- Run required database migrations
```
npx db-migrate up
```
- Build and run the project after setting the required environmental variables
```
npm start
```

## Environment Setup
Here's a example of the required enviroment variables used by the application.\
You could add them to a `.env` file for faster implementation
```
PORT=3000
DATABEASE_HOST=localhost
DATABASE_NAME=postgres
DATABASE_USER=postgres
DATABASE_PWD=postgres
DATABASE_PORT=5432
DATABASE_NAME_TEST=postgres_test
ENV=dev

BCRYPT_PWD=A_VERY_STRONG_PASSWORD
SALT_ROUNDS=10

JWT_SECRET=A_VERY_STRONG_PASSWORD
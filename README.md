# Wix Server with Node.js

This is wix Integration with Node.js. This is a simple server that will serve the wix application. In this backend server, we will have the following features:

- [x] Wix Integration
- [x] Wix API
- [x] Wix Webhooks
- [x] MySQL Database
- [x] Sequelize ORM

## Prcoess how its work:

- [x] Connect your database with the server using xampp or any other software.
- [x] Create a database and table in your database.
- [x] Log in to your wix dev account and create a new application.
- [x] Add redirect url "http://localhost:4000/auth/v1/redirect-url" in your wix application.
- [x] Add Api wix url "http://localhost:4000/api/v1/app-url" in your wix application.
- [x] Click on the "save" button and get the client id and client secret.
- [x] Click on the "Test your app" button and Market your app.
- [x] after adding permissions, you will get refresh token and access token.
- [x] Refresh token will automatically save in the database using this server.
- [x] Access token will use for getting the user information and other wix API.
- [x] Refresh token will use for getting the new access token after the old access token expired. I have created a middleware for this. that will automatically get the new access token using the refresh token with every request. e.g if I want to get the products from the wix store, so it will first get refresh token from database and then get the new access token and then get the products from the wix store.

## How to run the server:

- [x] Clone the repository.
- [x] Run `yarn install` or `npm install` to install the dependencies.
- [x] Run `yarn run dev` or `npm run dev` to start the server.
- [x] add .env file and add the following variables:
  - PORT=4000
  - SERVER_URL = "http://localhost:4000"
  - WIX_CLIENT_ID=
  - WIX_CLIENT_SECRET=

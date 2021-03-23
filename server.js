//REQUIRE EXPRESS
const express = require('express');

// IMPORT THE CONNECTION OBJECT
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

//JSON MIDDLEWARE
app.use(express.json());

//URL ENCODED MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

// CONNECT TO THE DATABASE BEFORE STARTING THE EXPRESS.js SERVER
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
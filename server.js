//REQUIRE EXPRESS
const express = require('express');

const routes = require('./routes');

// IMPORT THE CONNECTION OBJECT
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

//JSON MIDDLEWARE
app.use(express.json());

//URL ENCODED MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// CONNECT TO THE DATABASE BEFORE STARTING THE EXPRESS.js SERVER
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
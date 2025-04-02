// src/config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('vj_services', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // Disable all logs
});

sequelize.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error:", err));

module.exports = sequelize;

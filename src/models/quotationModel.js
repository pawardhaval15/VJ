// src/models/quotationModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Quotation = sequelize.define('Quotation', {
    company_name: {
        type: DataTypes.STRING,
        defaultValue: "VIJAY ENTERPRISES"
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: "Aluminium Sliding Windows, Doors & Partition, Structural Glazing, Aluminium Composite Panel"
    },
    gstn: {
        type: DataTypes.STRING,
        defaultValue: "27AXXPS1755Q1Z6"
    },
    pan: {
        type: DataTypes.STRING,
        defaultValue: "ABCDE1234F"
    },
    customer_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    mobile_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    party_gst_no: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    products: {
        type: DataTypes.JSON
    },
    total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'Quotations'
});

module.exports = Quotation;

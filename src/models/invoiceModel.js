const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Invoice = sequelize.define("Invoice", {
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerMobile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    partyGSTNo: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    products: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    cgstAmount: {
        type: DataTypes.FLOAT,
    },
    sgstAmount: {
        type: DataTypes.FLOAT,
    },
    totalAfterTax: {
        type: DataTypes.FLOAT,
    }
});

module.exports = Invoice;

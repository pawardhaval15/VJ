// src/migrations/create-quotation.js

'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Quotations', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            company_name: {
                type: Sequelize.STRING,
                defaultValue: "VIJAY ENTERPRISES"
            },
            description: {
                type: Sequelize.STRING,
                defaultValue: "Aluminium Sliding Windows, Doors & Partition, Structural Glazing, Aluminium Composite Panel"
            },
            gstn: {
                type: Sequelize.STRING,
                defaultValue: "27AXXPS1755Q1Z6"
            },
            pan: {
                type: Sequelize.STRING,
                defaultValue: "ABCDE1234F"
            },
            customer_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            mobile_no: {
                type: Sequelize.STRING,
                allowNull: false
            },
            party_gst_no: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            products: {
                type: Sequelize.JSON
            },
            total_amount: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Quotations');
    }
};

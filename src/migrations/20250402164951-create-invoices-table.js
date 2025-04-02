'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      customerAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      customerMobile: {
        type: Sequelize.STRING,
        allowNull: false
      },
      partyGSTNo: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      products: {
        type: Sequelize.JSON,
        allowNull: false
      },
      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      cgstAmount: {
        type: Sequelize.FLOAT
      },
      sgstAmount: {
        type: Sequelize.FLOAT
      },
      totalAfterTax: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invoices');
  }
};

const Sequelize = require("sequelize");
const sequelize = require('../config/Db');

const Stock = sequelize.define("stock", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type:Sequelize.FLOAT,
    allowNull: false
  },
  weight: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
  discount: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Stock;
const Sequelize = require("sequelize");
const sequelize = require('../config/Db');

const Product = sequelize.define("product", {
  serialNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type:Sequelize.STRING,
    allowNull: false,
    unique:true
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl:{
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
      type: Sequelize.STRING
  },
  total: {
      type: Sequelize.INTEGER
  }
});

module.exports = Product;
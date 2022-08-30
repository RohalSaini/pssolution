const Sequelize = require("sequelize");
const sequelize = require('../config/Db');

const Product = sequelize.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type:Sequelize.STRING,
    allowNull: false
  },
  brand: {
    type:Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type:Sequelize.STRING,
    allowNull: false
  },
  price: {
      type: Sequelize.FLOAT,
      allowNull: false
  },
  discount: {
      type: Sequelize.FLOAT,
      allowNull: false
  },
  ourPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  image: {
    type:Sequelize.STRING,
    allowNull: false
  },
  unique: {
    type:Sequelize.STRING,
    unique: true 
  }
});

module.exports = Product;
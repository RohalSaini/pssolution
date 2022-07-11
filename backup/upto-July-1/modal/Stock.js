const Sequelize = require("sequelize");
const sequelize = require('../config/Db');

const Stock = sequelize.define("stock", {
  discount: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  price: {
    type:Sequelize.FLOAT,
    allowNull: false
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
      default:1,
      max: 1,                 
      min: 5, 
  },
  sizeItemId: {
    type: Sequelize.STRING,
    allowNull:false,
    unique: true
  }
});

module.exports = Stock;
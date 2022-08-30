const Sequelize = require("sequelize");
const sequelize = require('../config/Db');

const Order = sequelize.define("order", {
  orderNumber: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  customerid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cart: {
    type: Sequelize.TEXT,
    allowNull:false
  },
  address: {
    type: Sequelize.STRING,
    allowNull:false
  },
  bill: {
    type: Sequelize.STRING,
    allowNull: false
  },
  checked: {
    type: Sequelize.BOOLEAN,
    default: false
  },
  orderType: {
    type:Sequelize.STRING,
    default: false
  },
  name: {
    type: Sequelize.STRING,
    default: false
  },
  cell: {
    type: Sequelize.BIGINT,
    default: false
  }
});

module.exports = Order;
const Sequelize = require("sequelize");
const sequelize = require('../config/Db');

const Item = sequelize.define("item", {
  serialNumber: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull:false
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull:false
  },
  measurement: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Item;
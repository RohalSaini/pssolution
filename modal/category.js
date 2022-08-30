const Sequelize = require("sequelize");
const sequelize = require('../config/Db');

const Category = sequelize.define("category", {
  type: {
    type: Sequelize.STRING,
    unique: true,
    allowNull:false
  }
});

module.exports = Category;
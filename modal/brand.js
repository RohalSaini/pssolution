const Sequelize = require("sequelize");
const sequelize = require('../config/Db');

const Brand = sequelize.define("brand", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull:false
  },
  quantity:{
    type:  Sequelize.TEXT,
    allowNull: false
  },
});

module.exports = Brand;
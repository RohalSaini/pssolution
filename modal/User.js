const Sequelize = require("sequelize");
const sequelize = require('../config/Db');

const User = sequelize.define("user", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  imageUrl:{
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = User;
const Sequelize = require("sequelize");
const sequelize = require('../config/Db');

const Pincode = sequelize.define("pinCode", {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  pin: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Pincode;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Address = sequelize.define('address', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

});

module.exports = Address;
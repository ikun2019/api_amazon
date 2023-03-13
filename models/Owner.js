const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Owner = sequelize.define('owner', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: DataTypes.STRING,
  about: DataTypes.STRING,
  photo: DataTypes.STRING
});
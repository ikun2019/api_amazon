const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  photo: DataTypes.STRING,
  stockQuantity: DataTypes.INTEGER,
  price: DataTypes.INTEGER,
  rating: [DataTypes.INTEGER]
});

module.exports = Product;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  headline: DataTypes.STRING,
  body: DataTypes.STRING,
  rating: [DataTypes.INTEGER],
  photo: DataTypes.STRING
});

module.exports = Review;
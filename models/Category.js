const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: { 
    type: DataTypes.STRING,  
    allowNull: false,
    unique: true,
  }
}, {
  timestamps: false, 
});

module.exports = Category;

import DataTypes from 'sequelize';
import sequelize from '../config/database.js';

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

export default Category;

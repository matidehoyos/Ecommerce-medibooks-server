const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');  // Importar el modelo User
const Book = require('./Book');  // Importar el modelo Book

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,  // Este campo hará referencia al auth0Id del modelo User
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',  // Puede ser 'active', 'completed', 'cancelled', etc.
    validate: {
      isIn: [['active', 'completed', 'cancelled']],  // Aseguramos que solo se utilicen estos valores
    },
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,  // El total del carrito comienza en 0
  },
  itemCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,  // La cantidad de artículos también comienza en 0
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: true,
});

// Relación entre Cart y User (cada carrito pertenece a un usuario)
Cart.belongsTo(User, { foreignKey: 'userId', targetKey: 'auth0Id' });

// Relación entre Cart y Book (asociación con los productos del carrito a través de otra tabla CartItems)
Cart.belongsToMany(Book, { through: 'CartItems' });

module.exports = Cart;

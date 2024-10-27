const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cart = require('./Cart');  // Importamos el modelo Cart
const Book = require('./Book');  // Importamos el modelo Book

const CartItems = sequelize.define('CartItems', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cart,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,  // Por defecto, la cantidad es 1
  },
  priceAtTime: {
    type: DataTypes.FLOAT,
    allowNull: false,  // El precio del libro al momento de agregarlo al carrito
  }
}, {
  timestamps: false,  // No necesitamos `createdAt` ni `updatedAt` para esta tabla
});

// Relación entre Cart y CartItems
Cart.hasMany(CartItems, { foreignKey: 'cartId' });
CartItems.belongsTo(Cart, { foreignKey: 'cartId' });

// Relación entre Book y CartItems
Book.hasMany(CartItems, { foreignKey: 'bookId' });
CartItems.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = CartItems;


import User from './User.js';
import Venta from './Venta.js';
import Pedido from './Pedido.js';
import DetallePedido from './DetallePedido.js';
import Book from './Book.js';
import Category from './Category.js';
import Cliente from './Cliente.js';
import sequelize from '../config/database.js';
import Promocion from './Promocion.js';
import LibroPromocion from './LibroPromocion.js';
import Resena from './Resena.js';

const models = {
  User,
  Venta,
  Pedido,
  DetallePedido,
  Book,
  Category,
  Cliente,
  Promocion,
  LibroPromocion,
  Resena
};

User.hasMany(Venta, { foreignKey: 'userId' });
Venta.belongsTo(User, { foreignKey: 'userId' });

Venta.hasMany(Pedido, { foreignKey: 'ventaId' });
Pedido.belongsTo(Venta, { foreignKey: 'ventaId' });

Pedido.hasMany(DetallePedido, { foreignKey: 'pedidoId' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

User.hasMany(Cliente, { foreignKey: 'userId' });
Cliente.belongsTo(User, { foreignKey: 'userId' });

Promocion.belongsToMany(Book, { through: 'LibroPromocion' });
Book.belongsToMany(Promocion, { through: 'LibroPromocion' });

Book.hasMany(Resena, { foreignKey: 'libroId' });
Resena.belongsTo(Book, { foreignKey: 'libroId' });

User.hasMany(Resena, { foreignKey: 'userId' });
Resena.belongsTo(User, { foreignKey: 'userId' });

export { sequelize };
export default models;


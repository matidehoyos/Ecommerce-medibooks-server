import User from './User.js';
import Venta from './Venta.js';
import Pedido from './Pedido.js';
import DetallePedido from './DetallePedido.js';
import Book from './Book.js';
import Category from './Category.js';
import Cliente from './Cliente.js';
import Direccion from './Direccion.js';
import Promocion from './Promocion.js';
import LibroPromocion from './LibroPromocion.js';
import Resena from './Resena.js';
import sequelize from '../config/database.js';

const models = {
  User,
  Venta,
  Pedido,
  DetallePedido,
  Book,
  Category,
  Cliente,
  Direccion,
  Promocion,
  LibroPromocion,
  Resena,
};

User.hasMany(Cliente, { foreignKey: 'userId', sourceKey: 'auth0Id' });
Cliente.belongsTo(User, { foreignKey: 'userId', targetKey: 'auth0Id' });

User.hasMany(Venta, { foreignKey: 'userId', sourceKey: 'auth0Id' });
Venta.belongsTo(User, { foreignKey: 'userId', targetKey: 'auth0Id' });

Venta.hasMany(Pedido, { foreignKey: 'ventaId', sourceKey: 'id' });
Pedido.belongsTo(Venta, { foreignKey: 'ventaId', targetKey: 'id' });

Pedido.hasMany(DetallePedido, { foreignKey: 'pedidoId' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

DetallePedido.belongsTo(Book, { foreignKey: 'productId', as: 'Book' });
Book.hasMany(DetallePedido, { foreignKey: 'productId' });

Cliente.hasMany(Pedido, { foreignKey: 'clienteId', as: 'pedidos' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

Cliente.hasMany(Direccion, { foreignKey: 'clienteId', as: 'direcciones' });
Direccion.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

Direccion.hasMany(Pedido, { foreignKey: 'direccionId', as: 'pedidos' });
Pedido.belongsTo(Direccion, { foreignKey: 'direccionId', as: 'direccion' });

Promocion.belongsToMany(Book, { through: 'LibroPromocion' });
Book.belongsToMany(Promocion, { through: 'LibroPromocion' });

Book.hasMany(Resena, { foreignKey: 'libroId' });
Resena.belongsTo(Book, { foreignKey: 'libroId' });

User.hasMany(Resena, { foreignKey: 'userId' });
Resena.belongsTo(User, { foreignKey: 'userId' });

export { sequelize };
export default models;



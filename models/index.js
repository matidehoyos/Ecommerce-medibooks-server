import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';


const User = sequelize.define('User', {
  auth0Id: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'users',
});

const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'books',
});

const Category = sequelize.define('Category', {
  nombre: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'categories' });

const Cliente = sequelize.define('Cliente', {
  nombre: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'clientes' });

const Direccion = sequelize.define('Direccion', {
  calle: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'direcciones' });

const Venta = sequelize.define('Venta', {
  total: { type: DataTypes.FLOAT, allowNull: false },
}, { tableName: 'ventas' });

const Pedido = sequelize.define('Pedido', {
  total: { type: DataTypes.FLOAT, allowNull: false },
}, { tableName: 'pedidos' });

const DetallePedido = sequelize.define('DetallePedido', {
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'detallepedidos' });

const Promocion = sequelize.define('Promocion', {
  nombre: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'promociones' });

const LibroPromocion = sequelize.define('LibroPromocion', {}, { tableName: 'librospromociones' });

const Resena = sequelize.define('Resena', {
  calificacion: { type: DataTypes.INTEGER, allowNull: false },
  comentario: { type: DataTypes.TEXT },
}, { tableName: 'resenas' });


User.hasMany(Cliente, { foreignKey: 'userId', sourceKey: 'auth0Id' });
Cliente.belongsTo(User, { foreignKey: 'userId', targetKey: 'auth0Id' });

User.hasMany(Venta, { foreignKey: 'userId', sourceKey: 'auth0Id' });
Venta.belongsTo(User, { foreignKey: 'userId', targetKey: 'auth0Id' });

Venta.hasMany(Pedido, { foreignKey: 'ventaId' });
Pedido.belongsTo(Venta, { foreignKey: 'ventaId' });

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

Promocion.belongsToMany(Book, { through: LibroPromocion });
Book.belongsToMany(Promocion, { through: LibroPromocion });

Book.hasMany(Resena, { foreignKey: 'libroId' });
Resena.belongsTo(Book, { foreignKey: 'libroId' });

User.hasMany(Resena, { foreignKey: 'userId' });
Resena.belongsTo(User, { foreignKey: 'userId' });



const models = {
  User, Venta, Pedido, DetallePedido, Book, Category,
  Cliente, Direccion, Promocion, LibroPromocion, Resena
};

export { sequelize };
export default models;

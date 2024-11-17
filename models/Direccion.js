import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Direccion = sequelize.define('Direccion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clienteId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clientes',
      key: 'id',
    },
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   piso: {
    type: DataTypes.STRING,
    defaultValue: '-',
  },
  departamento: {
    type: DataTypes.STRING,
    defaultValue: '-',
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigoPostal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  observacion: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '-',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  tableName: 'direcciones',
});

export default Direccion;


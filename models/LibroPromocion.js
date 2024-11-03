import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const LibroPromocion = sequelize.define('LibroPromocion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  libroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Books',
      key: 'id',
    },
  },
  promocionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'libro_promocion',
});

export default LibroPromocion;

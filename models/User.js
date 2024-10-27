const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  auth0Id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // El auth0Id debe ser único
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,  // Opcional, pero podría ser útil para que el usuario tenga un nombre personalizado único
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // El email también es único y requerido
    validate: {
      isEmail: true,  // Valida que sea un email correcto
    },
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,  // La URL de la imagen del perfil puede ser opcional
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',  // Todos los usuarios tienen el rol 'user' por defecto
    validate: {
      isIn: [['user', 'admin']],  // Solo puede ser 'user' o 'admin'
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,  // Se crea automáticamente al insertar un registro
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,  // Se actualiza automáticamente al modificar el registro
  }
}, {
  timestamps: true,  // Asegura que Sequelize maneje `createdAt` y `updatedAt`
});

// Método para verificar si el usuario es admin
User.prototype.isAdmin = function() {
  return this.role === 'admin';
};

module.exports = User;

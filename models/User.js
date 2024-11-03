import DataTypes from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  auth0Id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  
    validate: {
      isEmail: true,  
    },
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user', 
    validate: {
      isIn: [['user', 'admin']], 
    },
  },
  suspendido: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, 
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
  tableName: 'users'
});

User.prototype.isAdmin = function() {
  return this.role === 'admin';
};




export default User;


require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  dialect: 'postgres',
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente con la base de datos.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};

testConnection();

module.exports = sequelize;



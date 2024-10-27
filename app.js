require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const sequelize = require('./config/database'); 

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Ruta no encontrada',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Error del servidor',
    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;

sequelize.sync(({ alter: true }))
  .then(() => {
    console.log('Conexión a la base de datos establecida y tablas creadas.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  })

module.exports = app;

import express from 'express';
import { sequelize } from '../models';
const router = express.Router();
// Endpoint temporal para eliminar las tablas Carts y CartItems
router.delete('/delete-carts-tables', async (req, res) => {
  try {
    // Eliminar CartItems primero debido a la dependencia
    await sequelize.query('DROP TABLE IF EXISTS "CartItems";');
    await sequelize.query('DROP TABLE IF EXISTS "Carts";');
    await sequelize.query('DROP TABLE IF EXISTS "users";');

    res.status(200).json({ message: 'Tablas Carts y CartItems eliminadas exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar tablas:', error);
    res.status(500).json({ message: 'Error al eliminar las tablas', error });
  }
});

module.exports = router;

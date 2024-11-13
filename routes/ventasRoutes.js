import express from 'express';
import {
  createVenta,
  getVentas,
  getVentaById,
  updateVenta,
  deleteVenta,
} from '../controllers/ventasController.js';

const router = express.Router();

router.post('/', createVenta);
router.get('/', getVentas);
router.get('/:id', getVentaById);
router.put('/:id', updateVenta);
router.delete('/:id', deleteVenta);

export default router;

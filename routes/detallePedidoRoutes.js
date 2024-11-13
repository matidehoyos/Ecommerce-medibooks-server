import express from 'express';
import {
  createDetallePedido,
  getDetallesPedido,
  getDetallePedidoById,
  updateDetallePedido,
  deleteDetallePedido,
} from '../controllers/detallePedidoController.js';

const router = express.Router();

router.post('/', createDetallePedido);
router.get('/', getDetallesPedido);
router.get('/:id', getDetallePedidoById);
router.put('/:id', updateDetallePedido);
router.delete('/:id', deleteDetallePedido);


export default router;

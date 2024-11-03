import express from 'express';
import pedidoController from '../controllers/pedidoController.js';

const router = express.Router();

router.post('/', pedidoController.createPedido);
router.get('/', pedidoController.getPedidos);
router.get('/:id', pedidoController.getPedidoById);
router.put('/:id/estado', pedidoController.updatePedidoEstado);
router.delete('/:id', pedidoController.deletePedido);

export default router;

import { Router } from 'express';
import bookRoutes from './bookRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import userRoutes from './userRoutes.js';
import payRoutes from './payRoutes.js';
import promocionRoutes from './promocionRoutes.js';
import resenaRoutes from './resenaRoutes.js';
import clienteRoutes from './clienteRoutes.js';
import ventasRoutes from './ventasRoutes.js';
import transactionRoutes from './transactionRoutes.js';
import pedidoRoutes from './pedidoRoutes.js';
import direccionRoutes from './direccionRoutes.js';
import correoRoutes from './correoRoutes.js';

const router = Router();

router.use('/books', bookRoutes);
router.use('/categories', categoryRoutes);
router.use('/user', userRoutes);
router.use('/pay', payRoutes);
router.use('/promociones', promocionRoutes);
router.use('/reseñas', resenaRoutes);
router.use('/pedidos', pedidoRoutes);
router.use('/clientes', clienteRoutes);
router.use('/transaction', transactionRoutes);
router.use('/ventas', ventasRoutes);
router.use('/direccion', direccionRoutes);
router.use('/correo', correoRoutes);


export default router;


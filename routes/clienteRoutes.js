import { Router } from 'express';
import {  deleteCliente, getClienteById, getClientes, updateCliente } from '../controllers/clienteController.js'; 


const router = Router();

router.put('/clientes/update', updateCliente);
router.get('/clientes', getClientes);
router.get('/clientes/:id', getClienteById);
router.delete('/clientes/:id', deleteCliente);

export default router;

import { Router } from 'express';
import { createCliente } from '../controllers/clienteController.js'; 


const router = Router();

router.post('/', createCliente); 

export default router;

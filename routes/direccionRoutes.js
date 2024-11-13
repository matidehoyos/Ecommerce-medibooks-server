import { Router } from 'express';
import { createDireccion } from '../controllers/direccionController.js';


const router = Router();

router.post('/', createDireccion);

export default router;
import { Router } from 'express';
import { cotizacionCorreo } from '../controllers/correoController.js'; 


const router = Router();

router.post('/', cotizacionCorreo);

export default router;

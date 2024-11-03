import { Router } from 'express';
import createPayment from '../controllers/payController.js';

const router = Router();

router.post('/create', createPayment); 

export default router;

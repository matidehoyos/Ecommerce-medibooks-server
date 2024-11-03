import express from 'express';
const router = express.Router();
import transactionController from '../controllers/transactionController.js'; 

router.post('/save', transactionController.saveTransaction);

export default router;

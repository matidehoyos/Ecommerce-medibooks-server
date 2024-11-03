import express from 'express';
import promocionController from '../controllers/promocionController.js';

const router = express.Router();

router.post('/', promocionController.createPromocion);
router.get('/', promocionController.getPromociones);
router.get('/:id', promocionController.getPromocionById);
router.put('/:id', promocionController.updatePromocion);
router.delete('/:id', promocionController.deletePromocion);

export default router;

import express from 'express';
import reseñaController from '../controllers/resenaController.js';

const router = express.Router();

router.post('/', reseñaController.createReseña);
router.get('/', reseñaController.getReseñas);
router.get('/:id', reseñaController.getReseñaById);
router.put('/:id', reseñaController.updateReseña);
router.delete('/:id', reseñaController.deleteReseña);

export default router;

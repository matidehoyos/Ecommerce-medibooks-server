import express from 'express';
import bookController from '../controllers/bookController.js';
const router = express.Router();

router.get('/', bookController.getAllBooks);
router.post('/', bookController.createBook);
router.get('/:id', bookController.getBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);



export default router;

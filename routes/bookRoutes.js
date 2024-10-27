const express = require('express');
const { getAllBooks, createBook, updateBook, deleteBook, getBook } = require('../controllers/bookController');
const router = express.Router();

router.get('/', getAllBooks);
router.post('/', createBook);
router.get('/:id', getBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;

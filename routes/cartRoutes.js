const express = require('express');
const {
  createCart,
  getCart,
  addItemToCart,
  updateItemInCart,
  removeItemFromCart,
  clearCart,
  completeCart,
  syncCart 
} = require('../controllers/cartController'); 
const router = express.Router();

router.post('/', createCart); 
router.get('/:userId', getCart); 
router.post('/:cartId/items', addItemToCart); 
router.put('/:cartId/items/:bookId', updateItemInCart); 
router.delete('/:cartId/items/:bookId', removeItemFromCart); 
router.delete('/:cartId/clear', clearCart); 
router.put('/:cartId/complete', completeCart); 
router.post('/sync', syncCart);

module.exports = router;


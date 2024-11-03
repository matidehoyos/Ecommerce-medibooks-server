{/*import Book from '../models/Book.js';
const User = require('../models/User'); 
const sequelize = require('../config/database');


const createCart = async (req, res) => {
  const t = await sequelize.transaction(); // Iniciar una transacción
  try {
    const { userId, cartItems } = req.body;

    // Buscar un carrito activo existente para el usuario, con bloqueo de fila para evitar problemas de concurrencia
    let cart = await Cart.findOne({
      where: { userId, status: 'active' },
      lock: t.LOCK.UPDATE, // Bloquea la fila durante la transacción
      transaction: t, // Asegura que esta operación esté dentro de la transacción
    });

    if (cart) {
      // Si ya hay un carrito existente, aseguramos que no siga creando uno nuevo
      res.status(200).json(cart);
      return;
    }

    // Si no hay carrito existente, creamos uno nuevo dentro de la transacción
    cart = await Cart.create(
      {
        userId,
        status: 'active',
        totalAmount: 0,
        itemCount: 0,
      },
      { transaction: t } // Asegura que la creación del carrito esté dentro de la transacción
    );

    // Si el carrito viene del frontend, lo sincronizamos
    if (cartItems && cartItems.length > 0) {
      let totalAmount = 0;
      let itemCount = 0;

      for (const item of cartItems) {
        const { bookId, quantity, priceAtTime } = item;

        if (!bookId) {
          throw new Error(`El "bookId" es indefinido para uno de los artículos en el carrito.`);
        }

        // Comprobar si el artículo ya está en el carrito
        const [cartItem, created] = await CartItems.findOrCreate({
          where: { cartId: cart.id, bookId },
          defaults: { quantity, priceAtTime },
          transaction: t, // Asegura que la operación de CartItems esté dentro de la transacción
        });

        if (!created) {
          cartItem.quantity += quantity;
          await cartItem.save({ transaction: t });
        }

        totalAmount += priceAtTime * quantity;
        itemCount += quantity;
      }

      // Actualizar los totales del carrito
      cart.totalAmount += totalAmount;
      cart.itemCount += itemCount;
      await cart.save({ transaction: t });
    }

    await t.commit(); // Confirmar la transacción
    res.status(200).json(cart); // Enviar la respuesta final con el carrito creado
  } catch (error) {
    await t.rollback(); // Revertir la transacción si hay algún error
    console.error(error.message)
    res.status(500).json({ error: error.message });
  }
};



const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({
      where: { userId, status: 'active' },
      include: [{
        model: CartItems,
        include: [Book]  // Incluye información sobre los libros
      }]
    });

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('el errorrr ' + error.message);
    res.status(500).json({ error: error.message });
  }
};



const addItemToCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { bookId, quantity, priceAtTime } = req.body;

    const cart = await Cart.findByPk(cartId);
    if (!cart || cart.status !== 'active') {
      return res.status(404).json({ error: 'Carrito no encontrado o no activo' });
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    const [item, created] = await CartItems.findOrCreate({
      where: { cartId, bookId },
      defaults: { quantity, priceAtTime }
    });

    if (!created) {
      if (book.stock < item.quantity + quantity) {
        return res.status(400).json({ error: 'No hay suficiente stock disponible' });
      }
      item.quantity += quantity;
      await item.save();
    }

    const newTotalAmount = cart.totalAmount + (quantity * priceAtTime);
    const newItemCount = cart.itemCount + quantity;

    await cart.update({ totalAmount: newTotalAmount, itemCount: newItemCount });
    res.status(200).json({ cart, item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  

const updateItemInCart = async (req, res) => {
  try {
    const { cartId, bookId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findByPk(cartId);
    if (!cart || cart.status !== 'active') {
      return res.status(404).json({ error: 'Carrito no encontrado o no activo' });
    }

    const item = await CartItems.findOne({ where: { cartId, bookId } });
    if (!item) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    const priceDifference = (quantity - item.quantity) * item.priceAtTime;
    const itemCountDifference = quantity - item.quantity;

    item.quantity = quantity;
    await item.save();

    await cart.update({
      totalAmount: cart.totalAmount + priceDifference,
      itemCount: cart.itemCount + itemCountDifference
    });

    res.status(200).json({ cart, item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const removeItemFromCart = async (req, res) => {
  try {
    const { cartId, bookId } = req.params;

    const cart = await Cart.findByPk(cartId);
    if (!cart || cart.status !== 'active') {
      return res.status(404).json({ error: 'Carrito no encontrado o no activo' });
    }

    const item = await CartItems.findOne({ where: { cartId, bookId } });
    if (!item) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    const newTotalAmount = cart.totalAmount - (item.quantity * item.priceAtTime);
    const newItemCount = cart.itemCount - item.quantity;

    await item.destroy();
    await cart.update({ totalAmount: newTotalAmount, itemCount: newItemCount });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const clearCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await Cart.findByPk(cartId);
    if (!cart || cart.status !== 'active') {
      return res.status(404).json({ error: 'Carrito no encontrado o no activo' });
    }

    await CartItems.destroy({ where: { cartId } });
    await cart.update({ totalAmount: 0, itemCount: 0 });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const completeCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await Cart.findByPk(cartId);
    if (!cart || cart.status !== 'active') {
      return res.status(404).json({ error: 'Carrito no encontrado o no activo' });
    }

    await cart.update({ status: 'completed' });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const syncCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    let cart = await Cart.findOne({ where: { userId, status: 'active' } });
    
    if (!cart) {
      cart = await Cart.create({ userId });
    } else {
      await CartItems.destroy({ where: { cartId: cart.id } });
    }

    const newCartItems = cartItems.map(item => ({
      cartId: cart.id,
      bookId: item.bookId,
      quantity: item.quantity,
      priceAtTime: item.priceAtTime
    }));

    await CartItems.bulkCreate(newCartItems);

    const totalAmount = newCartItems.reduce((total, item) => total + (item.quantity * item.priceAtTime), 0);
    const itemCount = newCartItems.reduce((count, item) => count + item.quantity, 0);

    await cart.update({ totalAmount, itemCount });
    
    res.status(200).json({ message: 'Carrito sincronizado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  
  module.exports = {
    createCart,
    getCart,
    addItemToCart,
    updateItemInCart,
    removeItemFromCart,
    clearCart,
    completeCart,
    syncCart 
  };
  */}

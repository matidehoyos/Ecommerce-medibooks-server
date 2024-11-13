import Venta from '../models/Venta.js';
import DetallePedido from '../models/DetallePedido.js';
import User from '../models/User.js'; // Importa el modelo User

export const createVenta = async (req, res) => {
  const { userId, transactionId, status, paymentMethod, totalAmount, totalItems, items } = req.body;
  if (!userId || !transactionId || !status || !paymentMethod || !totalAmount || !totalItems || !items) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }
  try {
    const newVenta = await Venta.create({
      userId,
      transactionId,
      status,
      paymentMethod,
      totalAmount,
      totalItems,
    });

    const detallePedidos = items.map(item => ({
      pedidoId: newVenta.id, 
      productId: item.productId,
      title: item.title,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      subtotal: item.unitPrice * item.quantity,
    }));
    await DetallePedido.bulkCreate(detallePedidos);
    return res.status(201).json(newVenta);
  } catch (error) {
    console.error('Error al crear la venta:', error);
    return res.status(500).json({ message: 'Error al crear la venta', error: error.message });
  }
};

export const getVentas = async (req, res) => {
    try {
      const ventas = await Venta.findAll({
        include: {
          model: User,
          attributes: ['username'], 
        },
      });
      return res.status(200).json(ventas);
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
      return res.status(500).json({ message: 'Error al obtener las ventas', error: error.message });
    }
  };

export const getVentaById = async (req, res) => {
  const { id } = req.params;

  try {
    const venta = await Venta.findByPk(id);
    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada.' });
    }
    return res.status(200).json(venta);
  } catch (error) {
    console.error('Error al obtener la venta:', error);
    return res.status(500).json({ message: 'Error al obtener la venta', error: error.message });
  }
};

export const updateVenta = async (req, res) => {
  const { id } = req.params;
  const { status, paymentMethod, totalAmount, totalItems } = req.body;
  try {
    const venta = await Venta.findByPk(id);
    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada.' });
    }
    await venta.update({
      status,
      paymentMethod,
      totalAmount,
      totalItems,
    });
    return res.status(200).json(venta);
  } catch (error) {
    console.error('Error al actualizar la venta:', error);
    return res.status(500).json({ message: 'Error al actualizar la venta', error: error.message });
  }
};

export const deleteVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const venta = await Venta.findByPk(id);
    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada.' });
    }
    await venta.destroy();
    return res.status(204).json(); 
  } catch (error) {
    console.error('Error al eliminar la venta:', error);
    return res.status(500).json({ message: 'Error al eliminar la venta', error: error.message });
  }
};

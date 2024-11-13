import DetallePedido from '../models/DetallePedido.js';

export const createDetallePedido = async (req, res) => {
  const { pedidoId, productId, title, unitPrice, quantity, subtotal } = req.body;

  if (!pedidoId || !productId || !title || !unitPrice || !quantity || !subtotal) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }
  try {
    const newDetalle = await DetallePedido.create({
      pedidoId,
      productId,
      title,
      unitPrice,
      quantity,
      subtotal,
    });
    return res.status(201).json(newDetalle);
  } catch (error) {
    console.error('Error al crear el detalle de pedido:', error);
    return res.status(500).json({ message: 'Error al crear el detalle de pedido', error: error.message });
  }
};



export const getDetallesPedido = async (req, res) => {
  try {
    const detalles = await DetallePedido.findAll(); // Puedes incluir filtros o relaciones si es necesario
    return res.status(200).json(detalles);
  } catch (error) {
    console.error('Error al obtener los detalles de pedido:', error);
    return res.status(500).json({ message: 'Error al obtener los detalles de pedido', error: error.message });
  }
};



export const getDetallePedidoById = async (req, res) => {
  const { id } = req.params;

  try {
    const detalle = await DetallePedido.findByPk(id);
    if (!detalle) {
      return res.status(404).json({ message: 'Detalle de pedido no encontrado.' });
    }
    return res.status(200).json(detalle);
  } catch (error) {
    console.error('Error al obtener el detalle de pedido:', error);
    return res.status(500).json({ message: 'Error al obtener el detalle de pedido', error: error.message });
  }
};



export const updateDetallePedido = async (req, res) => {
  const { id } = req.params;
  const { productId, title, unitPrice, quantity, subtotal } = req.body;

  try {
    const detalle = await DetallePedido.findByPk(id);
    if (!detalle) {
      return res.status(404).json({ message: 'Detalle de pedido no encontrado.' });
    }

    await detalle.update({
      productId,
      title,
      unitPrice,
      quantity,
      subtotal,
    });

    return res.status(200).json(detalle);
  } catch (error) {
    console.error('Error al actualizar el detalle de pedido:', error);
    return res.status(500).json({ message: 'Error al actualizar el detalle de pedido', error: error.message });
  }
};



export const deleteDetallePedido = async (req, res) => {
  const { id } = req.params;

  try {
    const detalle = await DetallePedido.findByPk(id);
    if (!detalle) {
      return res.status(404).json({ message: 'Detalle de pedido no encontrado.' });
    }

    await detalle.destroy();
    return res.status(204).json(); 
  } catch (error) {
    console.error('Error al eliminar el detalle de pedido:', error);
    return res.status(500).json({ message: 'Error al eliminar el detalle de pedido', error: error.message });
  }
};

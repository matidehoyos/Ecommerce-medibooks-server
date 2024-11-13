import Pedido from '../models/Pedido.js';
import DetallePedido from '../models/DetallePedido.js';
import Venta from '../models/Venta.js';
import Cliente from '../models/Cliente.js';
import Book from '../models/Book.js';
import Direccion from '../models/Direccion.js';

const createPedido = async (req, res) => {
  try {
    const { ventaId, totalItems } = req.body;
    const newPedido = await Pedido.create({ ventaId, totalItems });
    res.status(201).json({ message: 'Pedido creado con éxito', pedido: newPedido });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pedido', error: error.message });
  }
};

export const getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [
        {
          model: Venta,
          attributes: ['id'],
        },
        {
          model: Cliente,
          as: 'cliente',
          attributes: ['userId' ,'nombre', 'email', 'telefono', 'createdAt'],
        },
        {
          model: Direccion,
          as: 'direccion', 
          attributes: ['direccion', 'piso', 'departamento', 'ciudad', 'codigoPostal', 'observacion' ], 
        },
        {
          model: DetallePedido,
          as: 'DetallePedidos',
          attributes: ['productId', 'title', 'terminacion', 'unitPrice', 'quantity', 'subtotal'],
          include: [
            {
              model: Book,
              as: 'Book',
              attributes: ['imagen'], 
            },
          ],
        },
      ],
    });
    return res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error.message);
    return res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
  }
};

const getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el pedido', error: error.message });
  }
};

const updatePedidoEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    pedido.estado = estado; 
    await pedido.save();
    res.status(200).json({ message: 'Estado del pedido actualizado con éxito', pedido });
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'Error al actualizar el estado del pedido', error: error.message });
  }
};

const deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    await pedido.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el pedido', error: error.message });
  }
};

export default {
  createPedido,
  getPedidos,
  getPedidoById,
  updatePedidoEstado,
  deletePedido,
};



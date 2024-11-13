import Venta from '../models/Venta.js'; 
import Pedido from '../models/Pedido.js'; 
import DetallePedido from '../models/DetallePedido.js'; 
import Cliente from '../models/Cliente.js'; 

const saveTransaction = async (req, res) => {
  const { transactionId, paymentMethod, status, totalAmount, userId, totalItems, items, direccionId, clienteId, costoEnvio } = req.body;

  try {
    const existingVenta = await Venta.findOne({ where: { transactionId } });
    if (existingVenta) {
      return res.status(400).json({ message: 'La transacción ya existe', venta: existingVenta });
    }

    const venta = await Venta.create({
      userId,
      transactionId,
      status,
      paymentMethod,
      totalAmount,
      costoEnvio
    });

    const cliente = await Cliente.findOne({ where: { userId } });
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    const pedido = await Pedido.create({
      ventaId: venta.id,
      clienteId,
      direccionId, 
      totalItems,
    });

    const detalles = items.map(item => ({
      pedidoId: pedido.id,
      productId: item.productId,
      title: item.title,
      terminacion: item.terminacion,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      subtotal: item.subtotal,
    }));

    await DetallePedido.bulkCreate(detalles);

    res.status(201).json({ venta, pedido, detalles });
  } catch (error) {
    console.error('Error al guardar la transacción:', error.errors ? error.errors : error.message);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Error de unicidad: la transacción ya existe', error });
    }

    res.status(500).json({ message: 'Error al guardar la transacción', error });
  }
};

export default { 
  saveTransaction 
};

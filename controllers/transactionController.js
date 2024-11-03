import Venta from '../models/Venta.js'; 
import Pedido from '../models/Pedido.js'; 
import DetallePedido from '../models/DetallePedido.js'; 

const saveTransaction = async (req, res) => {
  const { transactionId, status, totalAmount, userId, totalItems, items } = req.body;

  try {
    const venta = await Venta.create({
      transactionId,
      status,
      totalAmount,
      userId,
    });

    const pedido = await Pedido.create({
      ventaId: venta.id, 
      totalItems,
    });

    const detalles = items.map(item => ({
      pedidoId: pedido.id,
      productId: item.productId,
      title: item.title,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      subtotal: item.subtotal,
    }));

    await DetallePedido.bulkCreate(detalles); 

    res.status(201).json({ message: 'Transacción guardada con éxito', venta, pedido });
  } catch (error) {
    console.error('Error al guardar la transacción:', error.message);
    res.status(500).json({ message: 'Error al guardar la transacción', error });
  }
};

export default { 
    saveTransaction: saveTransaction 
};

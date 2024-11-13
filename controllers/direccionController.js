import Cliente from '../models/Cliente.js';
import Direccion from '../models/Direccion.js';

export const createDireccion = async (req, res) => {
    const { userId, nombre, direccion, piso, departamento, ciudad, codigoPostal, telefono, observaciones } = req.body;

  try {
    let clienteExistente = await Cliente.findOne({ where: { userId } });

    if (clienteExistente) {
      await clienteExistente.update({
        nombre: nombre,
        telefono: telefono,
      });
    }

    const nuevaDireccion = await Direccion.create({
      clienteId: clienteExistente.id,
      direccion,
      piso,
      departamento,
      ciudad,
      codigoPostal,
      observacion: observaciones
    });

    res.status(201).json({ 
      success: true, 
      clienteId: clienteExistente.id, 
      direccionId: nuevaDireccion.id 
    });
  } catch (error) {
    console.error('Error al guardar cliente y dirección:', error);
    res.status(500).json({ success: false, message: 'Error al procesar la compra' });
  }
};



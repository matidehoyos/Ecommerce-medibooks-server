import Cliente from '../models/Cliente.js'; 

export const createCliente = async (req, res) => {
  const { userId, direccion, ciudad, codigoPostal, telefono, observaciones } = req.body;

  if (!userId || !telefono || !ciudad || !codigoPostal || !direccion) {
    return res.status(400).json({ message: 'Los campos userId, teléfono, ciudad, código postal y dirección son obligatorios.' });
  }

  try {
    const newCliente = await Cliente.create({
      userId,
      direccion,
      ciudad,
      codigoPostal,
      telefono,
      observaciones,
    });

    return res.status(201).json(newCliente); 
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    return res.status(500).json({ message: 'Error al crear el cliente', error: error.message });
  }
};


import Cliente from '../models/Cliente.js'; 

export const updateCliente = async (userId, clienteData) => {
  try {
    const response = await fetch('/api/cliente/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, clienteData }), 
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Cliente actualizado:', result);
    } else {
      console.error('Error al actualizar el cliente:', result.message);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};



export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    return res.status(200).json(clientes);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    return res.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
  }
};



export const getClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }
    return res.status(200).json(cliente);
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    return res.status(500).json({ message: 'Error al obtener el cliente', error: error.message });
  }
};


export const deleteCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }

    await cliente.destroy();
    return res.status(204).json(); 
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    return res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
  }
};

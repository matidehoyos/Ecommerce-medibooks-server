import Cliente from '../models/Cliente.js';
import User from '../models/User.js';

const createUser = async (req, res) => {
  try {
    const { auth0Id, username, email, profilePicture } = req.body;
    console.log(auth0Id,username,email)

    const [newUser, created] = await User.findOrCreate({
      where: { auth0Id },
      defaults: {
        username,
        email,
        profilePicture,
        role: 'user',
      }
    });

    if (created) {
      await Cliente.create({
        userId: auth0Id,  
        nombre: username,    
        email: email,
        telefono: '-',
      });
    }

    res.status(201).json({
      message: created ? 'Usuario y cliente creados con éxito' : 'Usuario ya existente',
      user: newUser,
    });
  } catch (error) {
    console.error('Error al crear o encontrar el usuario:', error.message);
    res.status(500).json({ message: 'Error al crear o encontrar el usuario' });
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email }});
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message)
    throw new Error('Error al obtener el usuario: ' + error.message);
  }
};


const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Rol no válido' });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: 'Rol actualizado con éxito', user });
  } catch (error) {
    console.error('Error al actualizar el rol del usuario:', error.message);
    res.status(500).json({ message: 'Error al actualizar el rol' });
  }
};

const suspenderUsuario = async (req, res) => {
  const { id } = req.params;
  const { suspendido } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.suspendido = suspendido;
    await user.save();

    res.status(200).json({ message: 'Estado de suspensión actualizado', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al suspender al usuario: ' + error.message });
  }
};


const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      await user.destroy();
      res.status(204).send();
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: error.message });
    }
  };


export default {
  createUser: createUser,
  getUserByEmail: getUserByEmail,
  getUsers: getUsers,
  updateUserRole: updateUserRole,
  suspenderUsuario: suspenderUsuario,
  deleteUser: deleteUser
};

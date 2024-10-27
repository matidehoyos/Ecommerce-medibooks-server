const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    const { auth0Id, username, email, profilePicture } = req.body;

    const [newUser, created] = await User.findOrCreate({
      where: { auth0Id },
      defaults: {
        username,
        email,
        profilePicture,
        role: 'user',
      },
    });

    res.status(201).json({
      message: created ? 'Usuario creado con éxito' : 'Usuario ya existente',
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

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw new Error('Error al obtener el usuario: ' + error.message);
  }
};


module.exports = {
  createUser,
  getUserById,
  getUsers
};

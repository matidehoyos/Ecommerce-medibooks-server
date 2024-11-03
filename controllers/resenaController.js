import Reseña from '../models/Resena.js';

const createReseña = async (req, res) => {
  try {
    const { bookId, userId, comentario, calificacion } = req.body;
    const newReseña = await Reseña.create({ bookId, userId, comentario, calificacion });
    res.status(201).json({ message: 'Reseña creada con éxito', reseña: newReseña });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reseña', error: error.message });
  }
};

const getReseñas = async (req, res) => {
  try {
    const reseñas = await Reseña.findAll();
    res.status(200).json(reseñas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reseñas', error: error.message });
  }
};

const getReseñaById = async (req, res) => {
  try {
    const { id } = req.params;
    const reseña = await Reseña.findByPk(id);
    if (!reseña) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.status(200).json(reseña);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la reseña', error: error.message });
  }
};

const updateReseña = async (req, res) => {
  try {
    const { id } = req.params;
    const { comentario, calificacion } = req.body;
    const reseña = await Reseña.findByPk(id);
    if (!reseña) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    reseña.comentario = comentario;
    reseña.calificacion = calificacion;
    await reseña.save();
    res.status(200).json({ message: 'Reseña actualizada con éxito', reseña });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reseña', error: error.message });
  }
};

const deleteReseña = async (req, res) => {
  try {
    const { id } = req.params;
    const reseña = await Reseña.findByPk(id);
    if (!reseña) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    await reseña.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reseña', error: error.message });
  }
};

export default {
  createReseña,
  getReseñas,
  getReseñaById,
  updateReseña,
  deleteReseña,
};

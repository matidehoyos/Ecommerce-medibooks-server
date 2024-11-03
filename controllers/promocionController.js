import Promocion from '../models/Promocion.js';

const createPromocion = async (req, res) => {
  try {
    const { nombre, descuento, fechaInicio, fechaFin } = req.body;
    const newPromocion = await Promocion.create({ nombre, descuento, fechaInicio, fechaFin });
    res.status(201).json({ message: 'Promoción creada con éxito', promocion: newPromocion });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la promoción', error: error.message });
  }
};

const getPromociones = async (req, res) => {
  try {
    const promociones = await Promocion.findAll();
    res.status(200).json(promociones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las promociones', error: error.message });
  }
};

const getPromocionById = async (req, res) => {
  try {
    const { id } = req.params;
    const promocion = await Promocion.findByPk(id);
    if (!promocion) {
      return res.status(404).json({ message: 'Promoción no encontrada' });
    }
    res.status(200).json(promocion);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la promoción', error: error.message });
  }
};

const updatePromocion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descuento, fechaInicio, fechaFin } = req.body;
    const promocion = await Promocion.findByPk(id);
    if (!promocion) {
      return res.status(404).json({ message: 'Promoción no encontrada' });
    }
    promocion.nombre = nombre;
    promocion.descuento = descuento;
    promocion.fechaInicio = fechaInicio;
    promocion.fechaFin = fechaFin;
    await promocion.save();
    res.status(200).json({ message: 'Promoción actualizada con éxito', promocion });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la promoción', error: error.message });
  }
};

const deletePromocion = async (req, res) => {
  try {
    const { id } = req.params;
    const promocion = await Promocion.findByPk(id);
    if (!promocion) {
      return res.status(404).json({ message: 'Promoción no encontrada' });
    }
    await promocion.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la promoción', error: error.message });
  }
};

export default {
  createPromocion,
  getPromociones,
  getPromocionById,
  updatePromocion,
  deletePromocion,
};

const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
    const { nombre } = req.body;
    try {
      const newCategory = await Category.create({ nombre }); 
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: 'Error creando la categoría' });
    }
  };
  

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: 'Categoría no encontrada' });
    
    category.nombre = nombre;
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: 'Categoría no encontrada' });
    
    await category.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

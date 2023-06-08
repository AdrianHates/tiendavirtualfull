const express = require('express');
const Product = require('../esquemas/products'); // Importa el modelo de productos
const router = express.Router();
const app = express();
// todos los productos
router.get('/products', async (req, res) => {
  try {
    const productos = await Product.find(); 
    res.status(200).json(productos); 
  } catch (error) {
    res.status(500).json({ message: "el error viene de aqui?"}); 
  }
});

module.exports = router
const express = require('express');
const Product = require('../esquemas/products')
const Cart = require('../esquemas/cart')
const User = require('../esquemas/User')
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id, quantity } = req.body;
    const product = await Product.findById(id);
    
    if (!product) {
      throw new Error('El producto no existe');
    }
    
    if(!req.user) {
      throw new Error('Iniciar Sesión')
    }    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      throw new Error('El usuario no existe');
    }
    let cart = await Cart.findOne({ userId: user.id });
    
    if (!cart) {
      cart = new Cart({ userId: user.id });
    }
    const item = cart.items.find((item) => item.product.toString() === product.id.toString());
    console.log(item)
    if (item) {
      item.quantity += parseInt(quantity);
    } else {
      cart.items.push({ product: product.id, quantity: parseInt(quantity) });
    }
    await cart.save();
    const Usuario = await User.findById(req.user.id).populate('carts.items.product');
    res.status(201).json({ message: 'El producto se ha agregado al carrito', Usuario });
  } catch (error) {
    console.error(error);
    let errorMessage = 'Ocurrió un error al agregar el producto al carrito';
    if (error.message === 'El producto no existe') {
      errorMessage = 'El producto no existe';
    } else if (error.message === 'El usuario no existe') {
      errorMessage = 'El usuario no existe';
    } else if (error.message === 'Iniciar Sesión') {
      errorMessage = 'Por favor inicia sesión';
    }
  
    res.status(500).json({ message: errorMessage });
  }})

module.exports = router
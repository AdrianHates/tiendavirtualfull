import { Router } from  'express'
const router = Router()
import  Product from '../esquemas/products.js'
import Cart from '../esquemas/cart.js'
import User from '../esquemas/User.js'

router.post('/addtocart', async (req, res) => {
  try {
    const { id, quantity } = req.body;
    const product = await Product.findById(id);
    
    if (!product) {
      throw new Error('El producto no existe');
    }
    
    if(!req.user) {
      throw new Error('Iniciar Sesión')
    }    
    const user = await User.findById(req.user._id);
    
    if (!user) {
      throw new Error('El usuario no existe');
    }
    let cart = await Cart.findOne({ userId: user._id });
    
    if (!cart) {
      cart = new Cart({ userId: user.id });
    }
    
    const item = cart.items.find((item) => item.product.toString() === product.id.toString());

    if (item) {
      item.quantity += parseInt(quantity);
    } else {
      cart.items.push({ product: product.id, quantity: parseInt(quantity) });
    }
    await cart.save();
    const Usuario = await User.findById(req.user.id).populate({
      path: 'carts',
      model: 'Cart',
      populate: {
        path: 'items.product',
        model: 'Product'
      }
    });
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

  router.delete('/removefromcart/:id', async (req, res) => {
    try {
    const itemId = req.params.id
    const cart = await Cart.findOne({ userId: req.user._id })
    console.log(cart.items)
    const itemIndex = cart.items.findIndex((item) => item.product.id===itemId)
    cart.items.splice(itemIndex, 1);
    await cart.save();
    const Usuario = await User.findById(req.user.id).populate({
      path: 'carts',
      model: 'Cart',
      populate: {
        path: 'items.product',
        model: 'Product'
      }
    });
    return res.status(200).json({ message: 'Elemento eliminado del carrito', Usuario });
    } catch(error) {
      console.error(error)
      return res.status(500).json({ message: 'Error al eliminar el elemento del carrito' });
    }
  })

export default router
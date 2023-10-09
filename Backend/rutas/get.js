import { Router } from 'express'
import Product from '../esquemas/products.js'
const router = Router() // Importa el modelo de productos

// todos los productos
router.get('/products', async (req, res) => {
  try {
    const productos = await Product.find()
    res.status(200).json(productos)
  } catch (error) {
    res.status(500).json({ message: 'Error en la petición de los productos' })
  }
})

export default router

router.get('/products/:id', async (req, res) => {
  try {
    const productID = req.params.id
    const producto = await Product.findById(productID)
    res.status(200).json(producto)
  } catch (error) {
    res.status(500).json({ message: 'Error en la petición del producto?' })
  }
})

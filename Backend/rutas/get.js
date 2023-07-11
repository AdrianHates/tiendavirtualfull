import { Router } from 'express'
import Product from '../esquemas/products.js'
const router = Router() // Importa el modelo de productos

// todos los productos
router.get('/products', async (req, res) => {
  try {
    const productos = await Product.find()
    res.status(200).json(productos)
  } catch (error) {
    res.status(500).json({ message: 'el error viene de aqui?' })
  }
})

export default router

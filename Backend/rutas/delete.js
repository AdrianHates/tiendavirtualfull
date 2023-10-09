import { Router } from 'express'
import Product from '../esquemas/products.js'
const router = Router()

router.delete('/productos/:id', async (req, res) => {
  try {
    const productID = req.params.id
    // Verificar si el producto existe antes de eliminarlo
    const producto = await Product.findById(productID)
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    // Si el producto existe, eliminarlo
    await Product.findByIdAndDelete(productID)

    res.status(204).json() // Respuesta exitosa sin contenido
  } catch (error) {
    res.status(500).json({ message: 'Error al borrar del producto' })
  }
})

export default router

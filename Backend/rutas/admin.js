import { Router } from 'express'
import Product from '../esquemas/products.js'
const router = Router()

router.post('/addProductos', (req, res) => {
  const productData = req.body
  const newProduct = new Product(productData)
  newProduct.save()
    .then(product => {
      res.send(product)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.put('/updateProductos/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id)
    const updatedProductData = req.body

    const updatedProduct = Product.findByIdAndUpdate(productId, updatedProductData, { new: true })
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.json({ message: 'Producto actualizado exitosamente', product: updatedProduct })
  } catch (error) {
    console.error('Error al actualizar el producto:', error)
    res.status(500).json({ message: 'Error al actualizar el producto' })
  }
})

export default router

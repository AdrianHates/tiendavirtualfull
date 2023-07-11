import { Router } from 'express'
import Product from '../esquemas/products.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const router = Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

router.post('/addProductos', (req, res) => {
  const { name, description, price, category, marca, url, stock } = req.body;
  const newProduct = new Product({ name, description, price, category, marca, url, stock });
  newProduct.save()
    .then(product => {
      res.send(product)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.get('/addProductos', checkAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
})

function checkAdmin (req, res, next) {
  if (req.user && req.user.rol === 'admin') {
    next()
  } else {
    res.status(401).send('No tienes acceso a esta página')
  }
}

export default router

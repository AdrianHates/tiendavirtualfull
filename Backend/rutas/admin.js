const express = require("express")
const router = express.Router();
const Product = require("../esquemas/products")
const path = require("path")

router.post('/addProductos', (req, res) => {
  const { name, description, price, category, brand, url, stock } = req.body;
  const newProduct = new Product({ name, description, price, category, brand, url, stock });
  newProduct.save()
    .then(product => {
      res.send(product);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.get('/addProductos'/*, checkAdmin*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
})

function checkAdmin(req, res, next) {
  if (req.user && req.user.rol === 'admin') {
    next();
  } else {
    res.status(401).send('No tienes acceso a esta página');
  }
}

module.exports = router;
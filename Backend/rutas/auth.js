import { Router } from 'express'
import passport from 'passport'
import User from '../esquemas/User.js'
const router = Router()

router.post('/login', (req, res, next) => {
  passport.authenticate('local-signin', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Ha ocurrido un error interno' });
    }
    if (!user) {
      return res.status(400).json({ error: info.message })
    }
    req.login(user, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Ha ocurrido un error interno' });
      }
      const usuario = await User.findById(req.user._id)
        .populate({
          path: 'carts',
          model: 'Cart',
          populate: {
            path: 'items.product',
            model: 'Product'
          }
        }).populate('orders')
      console.log(req.user)
      return res.status(200).json({ message: 'Inicio de sesión exitoso', user: usuario });
    })
  })(req, res, next)
})

router.get('/logout', isAuthenticated, (req, res) => {
  req.logout(() => {})
  res.sendStatus(200)
})

router.get('/usuarioLog', isLog, async (req, res) => {
  try {
    // Obtener el usuario logueado y poblar las referencias al carrito y productos
    const usuario = await User.findById(req.user._id)
      .populate({
        path: 'carts',
        model: 'Cart',
        populate: {
          path: 'items.product',
          model: 'Product'
        }
      }).populate('orders')
      // Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).send('El usuario no existe');
    }
    // Enviar el resultado completo con los detalles del usuario, carrito y productos
    res.send(usuario)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error en el servidor')
  }
})

function isLog (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(401).json({ error: 'Usuario no autenticado' });
}

function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

export default router
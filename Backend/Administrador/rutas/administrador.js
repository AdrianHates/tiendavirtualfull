import express from 'express'
import User from '../../esquemas/User.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    const longitud = users.length - 1
    res.json(longitud)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los usuarios' })
  }
})

export default router

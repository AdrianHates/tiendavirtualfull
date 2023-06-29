import { Router } from  'express'
const router = Router()

router.get('/crear-orden', (req,res) => res.send('creating order'))

export default router
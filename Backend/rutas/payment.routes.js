import { Router } from 'express'
import { crearOrden, capturarOrden, cancelarPayment } from '../controladores/payment.controllers.js'
const router = Router()

router.post('/crear-orden', crearOrden)

router.get('/capturar-orden', capturarOrden)

router.get('/cancelar-orden', cancelarPayment)

export default router

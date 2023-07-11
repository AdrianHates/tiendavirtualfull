import { PAYPAL_API_CLIENT, PAYPAL_API_SECRET, PAYPAL_API, HOST } from '../config.js'
import axios from 'axios'
import Cart from '../esquemas/cart.js'
import Product from '../esquemas/products.js'
import Order from '../esquemas/order.js'
export const crearOrden = async (req, res) => {
  const total = req.body.cambioRealizado
  try {
    const order = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: total
          }
        }
      ],
      application_context: {
        brand_name: 'FastestStore',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${HOST}/capturar-orden`,
        cancel_url: `${HOST}/cancelar-orden`
      }
    }

    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    const { data: { access_token } } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET
      }
    })
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
      headers: {
        Authorization: `Bearer ${access_token} `
      }
    })

    return res.json(response.data)
  } catch (error) {
    return res.status(500).json('Something goes wrong')
  }
}

export const capturarOrden = async (req, res) => {
  const { token } = req.query
  const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {} , {
    auth: {
      username: PAYPAL_API_CLIENT,
      password: PAYPAL_API_SECRET
    }
  })

  const user = req.user
  const cart = await Cart.findOne({ userId: user._id })
  const productosComprados = cart.items
  for (const producto of productosComprados) {
    const productoenBD = await Product.findById(producto.product)
    productoenBD.stock -= producto.quantity
    await productoenBD.save()
  }
  const carritoItemsOrder = []
  let total = 0
  const itemsOrder = productosComprados

  for (const itemOrder of itemsOrder) {
    const product = await Product.findById(itemOrder.product)
    console.log(product)
    const price = product.price
    const objetoItem = {}
    objetoItem.product = itemOrder.product
    objetoItem.quantity = itemOrder.quantity
    objetoItem.price = price
    total += price
    carritoItemsOrder.push(objetoItem)
  }
  const order = new Order({
    user: user._id,
    items: carritoItemsOrder,
    total,
    status: 'pago'
  })
  await order.save()
  const orderId = order._id
  user.orders.push(orderId)
  await user.save()
  cart.items = []
  await cart.save()
  return res.redirect('/orden-completada')
}

export const cancelarPayment = (req, res) => res.redirect('/carrito')

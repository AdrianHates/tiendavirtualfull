import { PAYPAL_API_CLIENT, PAYPAL_API_SECRET, PAYPAL_API, HOST } from '../config.js'
import axios from 'axios'
import Cart from '../esquemas/cart.js'
import Product from '../esquemas/products.js'

export const crearOrden = async (req, res) => {
const total = req.body.cambioRealizado
try {
  const order = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
            value: total
        },
      },      
    ],
    application_context: {
      brand_name: "FastestStore",
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: 'https://tiendavirtualfull.onrender.com/capturar-orden',
      cancel_url: 'https://tiendavirtualfull.onrender.com/cancelar-orden',
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
  return res.status(500).json("Something goes wrong");
}
 
}

export const capturarOrden = async (req,res)=>{
  const { token } = req.query
  const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {} , {
    auth: {
      username: PAYPAL_API_CLIENT,
      password: PAYPAL_API_SECRET
    }
  })

  const user = req.user
  const cart = await Cart.findOne( { userId: user._id } )
  const productosComprados = cart.items
  console.log(productosComprados)
  for(const producto of productosComprados) {
    console.log(producto)
    const productoenBD = await Product.findById(producto.product)
    console.log(productoenBD)
    productoenBD.stock -= producto.quantity
    await productoenBD.save()
  }
  cart.items = [];
  await cart.save();
  return res.redirect('/orden-completada')
}


export const cancelarPayment = (req,res) => res.redirect("/carrito")


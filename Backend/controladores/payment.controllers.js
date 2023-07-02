import { PAYPAL_API_CLIENT, PAYPAL_API_SECRET, PAYPAL_API, HOST } from '../config.js'
import axios from 'axios'

export const crearOrden = async (req, res) => {
try {
  const order = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
            value: "100.00"
        }
      },
    ],
    application_context: {
      brand_name: "FastestStore",
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: `${HOST}/capturar-orden`,
      cancel_url: `${HOST}/cancelar-orden`,
    }
  }

  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')
  
  const { data: {access_token} } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
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
  console.log(response.data)
  
  return res.redirect('/orden-completada')
}


export const cancelarPayment = (req,res) => res.redirect("/carrito")


import { config } from 'dotenv';
config()

export const PORT = 5000
export const HOST = process.env.HOST
export const MONGODB_URI = process.env.MONGODB_URI
export const SECRET = process.env.SECRET

export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET
export const PAYPAL_API = process.env.PAYPAL_API
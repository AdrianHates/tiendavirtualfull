import express from 'express'
import morgan from "morgan"
import cors from 'cors'
import path from 'path'
import session from 'express-session'
import passport from './configuracion/auth.js';
import cookieParser from 'cookie-parser'
import { database } from './database.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//rutas importadas
import userRoutes from './rutas/user.js'
import getRouter from'./rutas/get.js'
import authRouter from'./rutas/auth.js'
import adminRouter from'./rutas/admin.js'
import cartRouter from'./rutas/cart.js'
import paymentRoutes from './rutas/payment.routes.js'

//iniciación - configurando
const app = express();
app.use(morgan("dev"))
app.use(express.json())
app.use(cors());
database()
//config paypal
/*const paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox',
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});
*/
//config session
app.use(cookieParser())
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
    //cookie: {      
       // Si estás utilizando HTTPS
     // maxAge: 3600000, // Tiempo de vida de la cookie en milisegundos
  //},
}));

//config auth

app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, '../Frontend/build/')));

//Usando rutas

app.use('/api/users', userRoutes);
app.use('/api/user', authRouter);
app.use('/api/get', getRouter);
app.use('/admin', adminRouter);
app.use('/api/addtocart', cartRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/build/index.html'));
})


app.listen(5000, () => {
  console.log(`Servidor iniciado en puerto 5000`);
});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport')
const config = require("./configuracion/auth")
//rutas importadas
const userRoutes = require('./rutas/user')
const getRouter = require('./rutas/get')
const authRouter = require('./rutas/auth')
const adminRouter = require('./rutas/admin')
const cartRouter = require('./rutas/cart')
//iniciación
const app = express();
const database = require('./database')

//config paypal
/*const paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox',
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});
*/
//config session

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

//config auth

app.use(passport.initialize());
app.use(passport.session());

// config de express
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

database.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.static(path.join(__dirname, '../Frontend/build')));

//Usando rutas
app.use('/api/users', userRoutes);
app.use('/api/user', authRouter);
app.use('/api/get', getRouter);
app.use('/admin', adminRouter);
app.use('/api/addtocart', cartRouter);

app.listen(5000, () => {
  console.log(`Servidor iniciado en puerto 5000`);
});
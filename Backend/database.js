const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config();

const database = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }).catch (e => {
  console.error('Error de conexión a MongoDB:', e.message)});

 module.exports=mongoose.connection
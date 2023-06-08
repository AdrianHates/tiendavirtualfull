const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config();

async function connectToMongoDB () {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  console.log("Conexión a MongoDB establecida en puerto");
 } catch (error) {
  console.log('Error de conexión a MongoDB:', err)};
 }

 connectToMongoDB()
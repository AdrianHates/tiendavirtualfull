const mongoose = require("mongoose")
const PORT = process.env.PORT || 5000
const dotenv = require('dotenv')
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Conexión a MongoDB establecida en puerto ${PORT}`);
}).catch(err => console.log('Error de conexión a MongoDB:', err));


import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Hombre', 'Mujer', 'Niño', 'Niña'],
    required: true
  },
  marca: {
    type: String,
    required: true
  },
  url: {
    type: [String], // Indica que es un array de strings
    required: true,
    validate: {
      validator: function (urls) {
        return urls.length === 4// Valida que el array de URLs tenga un máximo de 3 elementos
      },
      message: 'El array de URLs no puede tener más de 4 elementos'
    }
  },
  stock: {
    type: Number,
    required: true
  }
})

export default mongoose.model('Product', productSchema)

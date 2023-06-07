const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
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
  brand: {
    type: String,
    required: true
  },
  url : {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Product', productSchema);
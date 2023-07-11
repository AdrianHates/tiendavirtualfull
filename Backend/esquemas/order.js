import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pago', 'envío', 'entrega'],
    default: 'pago'
  }
}, {
  timestamps: true
})

export default mongoose.model('Order', orderSchema)

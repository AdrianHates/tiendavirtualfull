import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'shopping'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
      }
    }
  ]
});

export default mongoose.model('Cart', cartSchema);

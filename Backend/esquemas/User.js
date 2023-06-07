const mongoose = require('mongoose');
const cartSchema = require('./cart');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  rol: {
    type: String,
    default: 'usuario'
  },
  carts: {    
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    default: null
  },
  name: String,
  lastname: String,
  dni: Number,
  genero: String,
  birth: Date,
  phone: String
});

userSchema.pre('save', async function(next) {
  try {
    // Encriptar la contraseña antes de guardarla en la base de datos
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    // Crear un carrito "Compras" para el nuevo usuario
    const cart = new cartSchema({ name: 'Compras', userId: this._id });
    await cart.save();

    // Asignar el ID del carrito "Compras" al usuario
    this.carts = cart._id;

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(password) {

  try {
    if (!this.password) {
      return false;
    }
    // Verificar que la contraseña sea correcta
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
}



module.exports = mongoose.model('User', userSchema);
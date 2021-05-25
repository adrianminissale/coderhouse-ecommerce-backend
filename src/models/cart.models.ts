import mongoose from 'mongoose'

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
  productos: {type: Array, require: true},
  timestamp: {type: Number, require: true},
})

const CartModel = mongoose.model(cartCollection, cartSchema)

export default CartModel

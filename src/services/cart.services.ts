import CartModel from '../models/cart.models'

class Cart {

  constructor() {}

  async getAll () {
    try {
      const carts = await CartModel.find()

      if (!carts.length)
        throw new Error()

      return carts
    } catch {
      return { error: 'no hay carritos cargados' }
    }
  }

  async getOne (id :string) {
    try {
      const carts = await CartModel.findById(id)

      if (!carts)
        throw new Error()

      return carts
    } catch {
      return { error: 'carrito no encontrado' }
    }
  }

  async postOne (body :any) {
    try {
      body.timestamp = Date.now()
      await new CartModel(body).save()

      return body
    } catch {
      return { error: 'hubo un error al guardar el carrito' }
    }
  }

  async updateOne (id :string, body :any) {
    try {
      const cart = await CartModel.findByIdAndUpdate(id, body)

      if (!cart)
        throw new Error()

      return cart
    } catch {
      return { error: 'carrito no encontrado' }
    }
  }

  async deleteOne (id :string) {
    try {
      const cart = await CartModel.findByIdAndDelete(id)

      if (!cart)
        throw new Error()

      return { success: 'carrito eliminado' }
    } catch {
      return { error: 'carrito no encontrado' }
    }
  }

}
export default Cart

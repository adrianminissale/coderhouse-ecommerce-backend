import CartModel from '../models/cart.models';

class Cart {
  getAll = async () => {
    try {
      const carts = await CartModel.find();

      if (!carts.length) throw new Error();

      return carts;
    } catch {
      return { error: 'no hay carritos cargados' };
    }
  }

  getOne = async (id :string) => {
    try {
      const carts = await CartModel.findById(id);

      if (!carts) throw new Error();

      return carts;
    } catch {
      return { error: 'carrito no encontrado' };
    }
  }

  postOne = async (body :any) => {
    try {
      const cart = body;
      cart.timestamp = Date.now();
      await new CartModel(cart).save();

      return cart;
    } catch {
      return { error: 'hubo un error al guardar el carrito' };
    }
  }

  updateOne = async (id :string, body :any) => {
    try {
      const cart = await CartModel.findByIdAndUpdate(id, body);

      if (!cart) throw new Error();

      return cart;
    } catch {
      return { error: 'carrito no encontrado' };
    }
  }

  deleteOne = async (id :string) => {
    try {
      const cart = await CartModel.findByIdAndDelete(id);

      if (!cart) throw new Error();

      return { success: 'carrito eliminado' };
    } catch {
      return { error: 'carrito no encontrado' };
    }
  }
}

export default Cart;

import ProductsModel from '../models/products.models'

interface Params {
  name?: string;
  code?: number;
  price?: string;
  stock?: string;
}

class Products {

  constructor() {}

  async getAll (params :Params) {
    try {
      let products

      if (!Object.keys(params).length) {
        products = await ProductsModel.find()
      } else {
        if (params.name || params.code) {
          products = await ProductsModel.find(params)
        } else if (params.price || params.stock) {
          let [key, value] = Object.entries(params)[0]
          let range = value.split(',')
          products = await ProductsModel.find({$and: [
            {[key]: {$gt: range[0]}},
            {[key]: {$lt: range[1]}}
          ]})
        }
      }

      if (!products.length)
        throw new Error()

      return products
    } catch {
      return { error: 'no hay productos cargados' }
    }
  }

  async getOne (id :string) {
    try {
      const products = await ProductsModel.findById(id)

      if (!products)
        throw new Error()

      return products
    } catch {
      return { error: 'producto no encontrado' }
    }
  }

  async postOne (body :any) {
    try {
      body.timestamp = Date.now()
      await new ProductsModel(body).save()

      return body
    } catch {
      return { error: 'hubo un error al guardar el producto' }
    }
  }

  async updateOne (id :string, body :any) {
    try {
      const product = await ProductsModel.findByIdAndUpdate(id, body)

      if (!product)
        throw new Error()

      return body
    } catch {
      return { error: 'producto no encontrado' }
    }
  }

  async deleteOne (id :string) {
    try {
      const product = await ProductsModel.findByIdAndDelete(id)

      if (!product)
        throw new Error()

      return { success: 'producto eliminado' }
    } catch {
      return { error: 'producto no encontrado' }
    }
  }

}
export default Products

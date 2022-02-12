import faker from 'faker';
import ProductsModel from '../models/products.models';

interface Params {
  name?: string;
  code?: number;
  price?: string;
  stock?: string;
}

class Products {
  getAll = async (params? :Params) => {
    try {
      let products;

      if (!params || !Object.keys(params).length) {
        products = await ProductsModel.find();
      } else if (params.name || params.code) {
        products = await ProductsModel.find(params);
      } else if (params.price || params.stock) {
        const [key, value] = Object.entries(params)[0];
        const range = value.split(',');
        products = await ProductsModel.find({
          $and: [
            { [key]: { $gt: range[0] } },
            { [key]: { $lt: range[1] } },
          ],
        });
      }

      if (!products.length) throw new Error();

      return products;
    } catch {
      return { error: 'no hay productos cargados' };
    }
  }

  getOne = async (id :string) => {
    try {
      const products = await ProductsModel.findById(id);

      if (!products) throw new Error();

      return products;
    } catch {
      return { error: 'producto no encontrado' };
    }
  }

  postOne = async (body :any) => {
    try {
      const prod = body;
      prod.timestamp = Date.now();
      await new ProductsModel(prod).save();

      return prod;
    } catch (err) {
      return { error: 'hubo un error al guardar el producto' };
    }
  }

  updateOne = async (id :string, body :any) => {
    try {
      const product = await ProductsModel.findByIdAndUpdate(id, body);

      if (!product) throw new Error();

      return body;
    } catch {
      return { error: 'producto no encontrado' };
    }
  }

  deleteOne = async (id :string) => {
    try {
      const product = await ProductsModel.findByIdAndDelete(id);

      if (!product) throw new Error();

      return { success: 'producto eliminado' };
    } catch {
      return { error: 'producto no encontrado' };
    }
  }

  getAllTest = async (cant? :number) => {
    try {
      if (cant === 0) throw new Error();

      const products = [];
      const quantity = cant || 10;

      for (let i = 0; i < quantity; i += 1) {
        products.push({
          _id: faker.random.alphaNumeric(24),
          name: faker.commerce.productName(),
          category: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          stock: faker.datatype.number(),
          photo: faker.image.imageUrl(),
        });
      }

      return products;
    } catch {
      return { error: 'no hay productos cargados' };
    }
  }
}
export default Products;

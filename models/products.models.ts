import mongoose from 'mongoose';

const productsCollection = 'productos';

const productSchema = new mongoose.Schema({
  name: { type: String, require: true, max: 100 },
  description: { type: String, require: true, max: 100 },
  code: { type: Number, require: true },
  price: { type: Number, require: true },
  stock: { type: Number, require: true },
  photo: { type: String, require: true, max: 100 },
  timestamp: { type: Number, require: true },
});

const ProductsModel = mongoose.model(productsCollection, productSchema);

export default ProductsModel;

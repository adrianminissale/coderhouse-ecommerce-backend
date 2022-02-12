"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var productsCollection = 'productos';
var productSchema = new mongoose_1.default.Schema({
    name: { type: String, require: true, max: 100 },
    description: { type: String, require: true, max: 100 },
    code: { type: Number, require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    photo: { type: String, require: true, max: 100 },
    timestamp: { type: Number, require: true },
});
var ProductsModel = mongoose_1.default.model(productsCollection, productSchema);
exports.default = ProductsModel;

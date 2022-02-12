"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var cartCollection = 'cart';
var cartSchema = new mongoose_1.default.Schema({
    products: { type: Array, require: true },
    timestamp: { type: Number, require: true },
});
var CartModel = mongoose_1.default.model(cartCollection, cartSchema);
exports.default = CartModel;

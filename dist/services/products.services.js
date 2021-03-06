"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = __importDefault(require("faker"));
var products_models_1 = __importDefault(require("../models/products.models"));
var Products = /** @class */ (function () {
    function Products() {
        var _this = this;
        this.getAll = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var products, _a, key, value, range, _b;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 7, , 8]);
                        products = void 0;
                        if (!(!params || !Object.keys(params).length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, products_models_1.default.find()];
                    case 1:
                        products = _e.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(params.name || params.code)) return [3 /*break*/, 4];
                        return [4 /*yield*/, products_models_1.default.find(params)];
                    case 3:
                        products = _e.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(params.price || params.stock)) return [3 /*break*/, 6];
                        _a = Object.entries(params)[0], key = _a[0], value = _a[1];
                        range = value.split(',');
                        return [4 /*yield*/, products_models_1.default.find({
                                $and: [
                                    (_c = {}, _c[key] = { $gt: range[0] }, _c),
                                    (_d = {}, _d[key] = { $lt: range[1] }, _d),
                                ],
                            })];
                    case 5:
                        products = _e.sent();
                        _e.label = 6;
                    case 6:
                        if (!products.length)
                            throw new Error();
                        return [2 /*return*/, products];
                    case 7:
                        _b = _e.sent();
                        return [2 /*return*/, { error: 'no hay productos cargados' }];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getOne = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var products, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, products_models_1.default.findById(id)];
                    case 1:
                        products = _b.sent();
                        if (!products)
                            throw new Error();
                        return [2 /*return*/, products];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, { error: 'producto no encontrado' }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.postOne = function (body) { return __awaiter(_this, void 0, void 0, function () {
            var prod, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        prod = body;
                        prod.timestamp = Date.now();
                        return [4 /*yield*/, new products_models_1.default(prod).save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, prod];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, { error: 'hubo un error al guardar el producto' }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateOne = function (id, body) { return __awaiter(_this, void 0, void 0, function () {
            var product, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, products_models_1.default.findByIdAndUpdate(id, body)];
                    case 1:
                        product = _b.sent();
                        if (!product)
                            throw new Error();
                        return [2 /*return*/, body];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, { error: 'producto no encontrado' }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteOne = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var product, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, products_models_1.default.findByIdAndDelete(id)];
                    case 1:
                        product = _b.sent();
                        if (!product)
                            throw new Error();
                        return [2 /*return*/, { success: 'producto eliminado' }];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, { error: 'producto no encontrado' }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAllTest = function (cant) { return __awaiter(_this, void 0, void 0, function () {
            var products, quantity, i;
            return __generator(this, function (_a) {
                try {
                    if (cant === 0)
                        throw new Error();
                    products = [];
                    quantity = cant || 10;
                    for (i = 0; i < quantity; i += 1) {
                        products.push({
                            _id: faker_1.default.random.alphaNumeric(24),
                            name: faker_1.default.commerce.productName(),
                            category: faker_1.default.commerce.productName(),
                            price: parseInt(faker_1.default.commerce.price(), 10),
                            stock: faker_1.default.datatype.number(),
                            photo: faker_1.default.image.imageUrl(),
                        });
                    }
                    return [2 /*return*/, products];
                }
                catch (_b) {
                    return [2 /*return*/, { error: 'no hay productos cargados' }];
                }
                return [2 /*return*/];
            });
        }); };
    }
    return Products;
}());
exports.default = Products;

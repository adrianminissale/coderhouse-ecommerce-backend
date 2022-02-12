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
var normalizr_1 = require("normalizr");
var faker_1 = __importDefault(require("faker"));
var chats_models_1 = __importDefault(require("../models/chats.models"));
var Chats = /** @class */ (function () {
    function Chats() {
        var _this = this;
        this.getAll = function () { return __awaiter(_this, void 0, void 0, function () {
            var chats, newChats, user, chat, normalizedChats, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, chats_models_1.default.find()];
                    case 1:
                        chats = _b.sent();
                        if (!chats.length)
                            throw new Error();
                        newChats = chats.map(function (chat) { return ({
                            author: {
                                id: chat.email,
                                nombre: faker_1.default.name.firstName(),
                                apellido: faker_1.default.name.lastName(),
                                edad: faker_1.default.datatype.number(99),
                                alias: faker_1.default.internet.userName(),
                                avatar: faker_1.default.internet.avatar(),
                            },
                            // eslint-disable-next-line
                            _id: chat._id,
                            text: chat.message,
                            time: chat.time,
                        }); });
                        user = new normalizr_1.schema.Entity('user');
                        chat = new normalizr_1.schema.Entity('chat', { author: user }, { idAttribute: 'text' });
                        normalizedChats = (0, normalizr_1.normalize)(newChats, [chat]);
                        console.log('OBJETO NORMALIZADO: ', JSON.stringify(normalizedChats).length);
                        return [2 /*return*/, normalizedChats];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, { error: 'no hay chats cargados' }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getOne = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var chats, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, chats_models_1.default.findById(id)];
                    case 1:
                        chats = _b.sent();
                        if (!chats)
                            throw new Error();
                        return [2 /*return*/, chats];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, { error: 'chat no encontrado' }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.postOne = function (body) { return __awaiter(_this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new chats_models_1.default(body).save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, body];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, { error: 'hubo un error al guardar el chat' }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateOne = function (id, body) { return __awaiter(_this, void 0, void 0, function () {
            var chats, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, chats_models_1.default.findByIdAndUpdate(id, body)];
                    case 1:
                        chats = _b.sent();
                        if (!chats)
                            throw new Error();
                        return [2 /*return*/, body];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, { error: 'chat no encontrado' }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteOne = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var chats, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, chats_models_1.default.findByIdAndDelete(id)];
                    case 1:
                        chats = _b.sent();
                        if (!chats)
                            throw new Error();
                        return [2 /*return*/, { success: 'chat eliminado' }];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, { error: 'chat no encontrado' }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return Chats;
}());
exports.default = Chats;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var chatsCollection = 'chats';
var chatSchema = new mongoose_1.default.Schema({
    email: { type: String, require: true, max: 100 },
    time: { type: String, require: true, max: 100 },
    message: { type: String, require: true },
});
var ChatsModel = mongoose_1.default.model(chatsCollection, chatSchema);
exports.default = ChatsModel;

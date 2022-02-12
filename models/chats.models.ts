import mongoose from 'mongoose';

const chatsCollection = 'chats';

const chatSchema = new mongoose.Schema({
  email: { type: String, require: true, max: 100 },
  time: { type: String, require: true, max: 100 },
  message: { type: String, require: true },
});

const ChatsModel = mongoose.model(chatsCollection, chatSchema);

export default ChatsModel;

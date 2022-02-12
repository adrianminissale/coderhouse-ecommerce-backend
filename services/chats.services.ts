import { normalize, schema } from 'normalizr';
import faker from 'faker';
import ChatsModel from '../models/chats.models';

class Chats {
  getAll = async () => {
    try {
      const chats = await ChatsModel.find();

      if (!chats.length) throw new Error();

      const newChats = chats.map((chat: any) => ({
        author: {
          id: chat.email,
          nombre: faker.name.firstName(),
          apellido: faker.name.lastName(),
          edad: faker.datatype.number(99),
          alias: faker.internet.userName(),
          avatar: faker.internet.avatar(),
        },
        // eslint-disable-next-line
        _id: chat._id,
        text: chat.message,
        time: chat.time,
      }));

      const user = new schema.Entity('user');
      const chat = new schema.Entity('chat', { author: user }, { idAttribute: 'text' });
      const normalizedChats = normalize(newChats, [chat]);
      console.log('OBJETO NORMALIZADO: ', JSON.stringify(normalizedChats).length);

      return normalizedChats;
    } catch {
      return { error: 'no hay chats cargados' };
    }
  }

  getOne = async (id :string) => {
    try {
      const chats = await ChatsModel.findById(id);

      if (!chats) throw new Error();

      return chats;
    } catch {
      return { error: 'chat no encontrado' };
    }
  }

  postOne = async (body :any) => {
    try {
      await new ChatsModel(body).save();

      return body;
    } catch (err) {
      return { error: 'hubo un error al guardar el chat' };
    }
  }

  updateOne = async (id :string, body :any) => {
    try {
      const chats = await ChatsModel.findByIdAndUpdate(id, body);

      if (!chats) throw new Error();

      return body;
    } catch {
      return { error: 'chat no encontrado' };
    }
  }

  deleteOne = async (id :string) => {
    try {
      const chats = await ChatsModel.findByIdAndDelete(id);

      if (!chats) throw new Error();

      return { success: 'chat eliminado' };
    } catch {
      return { error: 'chat no encontrado' };
    }
  }
}
export default Chats;

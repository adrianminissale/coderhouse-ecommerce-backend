// eslint-disable-next-line
const socket = io();

const form = document.getElementById('form');
const chat = document.getElementById('chat');

form.onsubmit = (event) => {
  event.preventDefault();

  const newProduct = {
    name: form.elements.name.value,
    category: form.elements.category.value,
    price: form.elements.price.value,
    stock: form.elements.stock.value,
    photo: form.elements.photo.value,
  };

  socket.emit('newProduct', newProduct);

  form.reset();
};

socket.on('newProduct', (newProduct) => {
  const table = document.getElementById('table');
  const row = document.createElement('tr');
  row.innerHTML = `<td>${newProduct.name}</td><td>${newProduct.category}</td><td>$ ${newProduct.price}</td><td>${newProduct.stock}</td><td><img src='${newProduct.photo}' alt='${newProduct.name}' /></td>`;
  table.append(row);
});

chat.onsubmit = (event) => {
  event.preventDefault();

  const newChat = {
    email: chat.elements.email.value,
    time: new Date(),
    message: chat.elements.message.value,
  };

  socket.emit('newChat', newChat);

  chat.elements.message.value = '';
};

socket.on('newChat', (newChat) => {
  const chats = document.getElementById('chats');
  const div = document.createElement('div');
  div.innerHTML = `<span class='mail'>${newChat.email}</span><span class='time'>[${newChat.time}] :</span><span class='message'>${newChat.message}</span>`;
  chats.append(div);
});

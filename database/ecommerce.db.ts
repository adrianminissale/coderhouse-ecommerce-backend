import 'dotenv/config';

const mongoose = require('mongoose');

const ecommerceConnection = () => {
  mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Base de datos conectada');
    })
    .catch((err :any) => {
      console.log(err);
      throw err;
    });
};

module.exports = ecommerceConnection;

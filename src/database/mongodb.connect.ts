import mongoose from 'mongoose'

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`

const dbConnection = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Base de datos conectada')
  })
  .catch((err :any) => {
    console.log(err)
    throw err
  });
}

module.exports = dbConnection

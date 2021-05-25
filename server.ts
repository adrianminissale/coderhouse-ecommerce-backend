import express from 'express'
import { AddressInfo } from 'net'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 8080
const auth = require('./src/middleware/auth.middleware')
const products = require('./src/routes/products.routes')
const cart = require('./src/routes/cart.routes')
const dbConnection = require('./src/database/mongodb.connect')

const server = app.listen(PORT, () => {
  const address = server.address() as AddressInfo
  console.log(`Servidor levantado en el puerto ${address.port}`)
  dbConnection()
})

server.on('error', (error :any) => {
  console.log(`Error en servidor ${error}`)
})

app.use(express.json())
app.use(express.urlencoded())
app.use(auth);

app.use('/products', products)
app.use('/cart', cart)

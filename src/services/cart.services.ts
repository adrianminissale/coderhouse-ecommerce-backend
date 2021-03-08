import fs from 'fs'

class Cart {
  private dataFile :string = `${process.cwd()}/src/data/carts.txt`
  private findOneCart = (carts :[], id :number) => {
    return carts.find( (cart: { id: number }) => cart.id === id )
  }

  constructor() {}

  async getAll () {
    try {
      const data = await fs.promises.readFile(this.dataFile, 'utf-8')
      const carts = data ? JSON.parse(data) : []

      if (!carts.length)
        throw new Error()

      return carts
    } catch {
      return { error: 'no hay carritos cargados' }
    }
  }

  async getOne (id :number) {
    try {
      const data = await fs.promises.readFile(this.dataFile, 'utf-8')
      const carts = data ? JSON.parse(data) : []

      if (!carts.length || !this.findOneCart(carts, id))
        throw new Error()

      return this.findOneCart(carts, id)
    } catch {
      return { error: 'carrito no encontrado' }
    }
  }

  async postOne (body :any) {
    try {
      const data = await fs.promises.readFile(this.dataFile, 'utf-8')
      let carts = data ? JSON.parse(data) : []

      if (!carts.length) {
        carts = []
        body.id = 0
      } else {
        body.id = carts.length
      }
      body.timestamp = Date.now()
      carts.push(body)

      await fs.promises.writeFile(this.dataFile, JSON.stringify(carts))
      return body
    } catch {
      return { error: 'hubo un error al guardar el carrito' }
    }
  }

  async updateOne (id :number, body :any) {
    try {
      const data = await fs.promises.readFile(this.dataFile, 'utf-8')
      const carts = data ? JSON.parse(data) : []

      if (!carts.length || !this.findOneCart(carts, id))
        throw new Error()

      Object.assign(this.findOneCart(carts, id), body)
      await fs.promises.writeFile(this.dataFile, JSON.stringify(carts))
      return this.findOneCart(carts, id)
    } catch {
      return { error: 'carrito no encontrado' }
    }
  }

}
export default Cart

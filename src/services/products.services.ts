import fs from 'fs'

class Products {
  private dataFile :string = `${process.cwd()}/src/data/products.txt`
  private findOneProduct = (products :[], id :number) => {
    return products.find( (prod: { id: number }) => prod.id === id )
  }

  constructor() {}

  async getAll () {
    try {
      const data = await fs.promises.readFile(this.dataFile, 'utf-8')
      const products = data ? JSON.parse(data) : []

      if (!products.length)
        throw new Error()

      return products
    } catch {
      return { error: 'no hay productos cargados' }
    }
  }

  async getOne (id :number) {
    try {
      const data = await fs.promises.readFile(this.dataFile, 'utf-8')
      const products = data ? JSON.parse(data) : []

      if (!products.length || !this.findOneProduct(products, id))
        throw new Error()

      return this.findOneProduct(products, id)
    } catch {
      return { error: 'producto no encontrado' }
    }
  }

  async postOne (body :any) {
    try {
      const data = await fs.promises.readFile(this.dataFile, 'utf-8')
      let products = data ? JSON.parse(data) : []

      if (!products.length) {
        products = []
        body.id = 0
      } else {
        body.id = products.length
      }
      body.timestamp = Date.now()
      products.push(body)

      await fs.promises.writeFile(this.dataFile, JSON.stringify(products))
      return body
    } catch {
      return { error: 'hubo un error al guardar el producto' }
    }
  }

  async updateOne (id :number, body :any) {
    try {
      const data = await fs.promises.readFile(this.dataFile, 'utf-8')
      const products = data ? JSON.parse(data) : []

      if (!products.length || !this.findOneProduct(products, id))
        throw new Error()

      Object.assign(this.findOneProduct(products, id), body)
      await fs.promises.writeFile(this.dataFile, JSON.stringify(products))
      return this.findOneProduct(products, id)
    } catch {
      return { error: 'producto no encontrado' }
    }
  }

  async deleteOne (id :number) {
    try {
      const data = await fs.promises.readFile(this.dataFile, 'utf-8')
      let products = data ? JSON.parse(data) : []

      if (!products.length || !this.findOneProduct(products, id))
        throw new Error()

      products = products.filter( (prod: { id: number }) => prod.id !== id )
      await fs.promises.writeFile(this.dataFile, JSON.stringify(products))
      return { success: 'producto eliminado' }
    } catch {
      return { error: 'producto no encontrado' }
    }
  }

}
export default Products

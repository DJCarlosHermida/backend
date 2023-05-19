import fs from 'fs'

export default class CartManager {
    constructor(path) {
        this.path = path
        this.id = this.#createId
    }

    async getCarts() {
        if (fs.existsSync(this.path)) {
            const carts = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(carts)
        } else {
            return []
        }
    }

    async getCartsById(idCart) {
        const cartsFile = await this.getCarts()
        const cart = cartsFile.find((c) => c.id === idCart)
        if (cart) {
            return cart
        } else {
            return 'Cart not found'
        }
    }

    async createCart() {
        try {
          const cartFile = await this.getCarts()
          const newCart = {id: this.#createId(cartFile), products: []};
          cartFile.push(newCart)
      
          await fs.promises.writeFile(this.path, JSON.stringify(cartFile))
          return newCart
        } catch (error) {
          console.log(`Error Creating Cart: ${error.message}`)
        }
      }
        
    #createId(carts) {
        let id = 0
        if (carts.length === 0) {
            id = 1
        } else (
            id = carts[carts.length - 1].id + 1
        )
        return id
    }
  
}
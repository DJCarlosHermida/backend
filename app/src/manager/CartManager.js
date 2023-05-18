import fs from 'fs'

export default class CartManager {
    constructor(path) {
        this.path = path
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

    async createCart(obj) {
        try {
            if (this.#validateParams(obj)) {
                const cartFile = await this.getCarts()
                const id = this.#createId(cartFile)
                const code = this.#generateCode(cartFile)
                let newCart = {}
                if (!obj.id) {
                    newCart = { id, code, ...obj }
                }
                cartFile.push(newCart)
                await fs.promises.writeFile(this.path, JSON.stringify(cartFile))
                return newCart
            }

        } catch (error) {
            console.log(`Error Creating Cart: ${error.message}`);
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

    #generateCode(codeLength = 15) {
        const number = "0123456789"
        const letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

        let code = ""
        for (let index = 0; index < codeLength; index++) {
            const random = Math.floor(Math.random() * codeABC123.length)
            code += codeABC123.charAt(random)
        }
        return code
    }

    #validateParams(carts) {
        if (carts.id && carts.code) {
            return true
        } else {
            if (!carts.id) {
                throw new Error('Cart Id missing')
            } else if (!carts.code) {
                throw new Error('Cart Code Missing')
            }
        }
    }
}
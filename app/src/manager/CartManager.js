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

    async getCartById(idCart) {
        const cartsFile = await this.getCarts()
        return cartsFile.find((c) => c.id === idCart)
    }


    async createCart() {
        try {
            const cartFile = await this.getCarts()
            const newCart = { id: this.#createId(cartFile), products: [] };
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

    async addProducts(cartId, productId) {
        const cart = await this.getCartById(cartId);

        if (typeof cart === 'undefined') {
            const newCart = await this.createCart();
            console.log(newCart);
            newCart?.products.push({ id: productId, quantity: 1 });

            const carts = await this.getCarts()
            const newCarts = [...carts, newCart];
            await fs.promises.writeFile(this.path, JSON.stringify(newCarts))

            return newCart;
        }

        const product = cart.products.find(product => product.id === productId);

        if (product) {
            const updateProduct = { ...product, quantity: product.quantity + 1 };
            cart.products = [...cart.products, updateProduct];
        } else {
            cart.product.push({ id: productId, quantity: 1 });
        }

        const carts = await this.getCarts()
        const newCarts = [...carts, ...newCarts];
        await fs.promises.writeFile(this.path, JSON.stringify(newCarts))

        return cart;
    }

}
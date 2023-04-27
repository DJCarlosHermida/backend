import fs from 'fs'

export default class ProductManager {
    constructor(path) {
        this.path = path
    }

    async getProducts() {
        if (fs.existsSync(this.path)) {
            const products = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(products)
        } else {
            return []
        }
    }

    async getProductById(idProd) {
        const productsFile = await this.getProducts()
        const product = productsFile.find((p) => p.id === idProd)
        if (product) {
            return product
        } else {
            return 'Product not found'
        }
    }

    async createProduct(obj) {
        const productsFile = await this.getProducts()
        const id = this.#createId(productsFile)
        const newProduct = { id, ...obj }
        productsFile.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
        return newProduct
    }

    async deleteProducts() {
        if (existsSync(this.path)) {
            await fs.promises.unlink(this.path)
            return 'Products deleted'
        } else {
            return 'There is no products'
        }
    }

    async deleteProductById(idProd) {
        const productsFile = await this.getProducts()
        const productIndex = productsFile.findIndex((p) => p.id === idProd)
        if (productIndex === -1) {
            return 'Product does not exist'
        } else {
            productsFile.splice(productIndex, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
            return 'Product deleted'
        }
    }

    async updateProduct(idProd, obj) {
        const productsFile = await this.getProducts()
        const product = productsFile.find((p) => p.id === idProd)
        if (!product) {
            return 'Product does not exist'
        } else {
            const updatedProduct = { ...product, ...obj }
            const productIndex = productsFile.findIndex((p) => p.id === idProd)
            productsFile.splice(productIndex, 1, updatedProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
            return 'Product updated'
        }
    }

    #createId(products) {
        let id
        if (products.length === 0) {
            id = 1
        } else (
            id = products[products.length - 1].id + 1
        )
        return id
    }
}
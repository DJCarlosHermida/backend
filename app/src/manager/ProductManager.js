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
        try {
            if (this.#validateParams(obj)) {
                const productsFile = await this.getProducts()
                const id = this.#createId(productsFile)
                const code = this.#generateCode()
                let thumbnail = ""
                let newProduct = {}
                if (!obj.thumbnail) {
                    thumbnail = "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
                    newProduct = { id, code, status: true, thumbnail, ...obj }
                } else {
                    newProduct = { id, code, status: true, ...obj }
                }
                productsFile.push(newProduct)
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
                return newProduct
            }

        } catch (error) {
            console.log(`Error Creating Product: ${error.message}`);
        }
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

    #generateCode(codeLength = 15) {
        const number = "0123456789"
        const letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const codeABC123 = number + letter

        let code = ""
        for (let index = 0; index < codeLength; index++) {
            const random = Math.floor(Math.random() * codeABC123.length)
            code += codeABC123.charAt(random)
        }
        return code
    }

    #validateParams(product) {
        if (product.title && product.description && product.price && product.stock && product.category && !product.id && !product.code) {
            return true
        } else {
            if (!product.title) {
                throw new Error("Product Title missing")
            } else if (!product.description) {
                throw new Error("Product Description missing")
            } else if (!product.price) {
                throw new Error("Product price missing")
            } else if (!product.stock) {
                throw new Error("Product Stock missing")
            } else if (!product.category) {
                throw new Error("Product Category missing")
            } else if (product.id) {
                throw new Error("The Product must not have id")
            } else if (product.code) {
                throw new Error("The Product must not have Code")
            }
        }
    }
}
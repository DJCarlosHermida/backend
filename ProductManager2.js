const fs = require('fs')
const path = 'productos.json'

fs.promises
class ProductManager {
    #servicios = 0.65
    constructor(path) {
        this.products = [],
            this.id = 0,
            this.path = path
    }

    getProducts = async () => {
        if (fs.existsSync(path)) {
            const info = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(info)
            return (products)
        } else {
            console.log('el archivo no existe');
            return []
        }
    }

    addProduct = async (title, description, price, thumbnail = 'imágen no disponible', stock = 30) => {
        const product = {
            id: this.#generarId(),
            title: title,
            description: description,
            price: (price / this.#servicios).toFixed(2),
            thumbnail,
            stock,
            code: 2023 + this.#generarId()
        }

        if (!product.price || !product.title || !product.description || !product.thumbnail || !product.stock || !product.code) {
            throw new Error(' Campos Obligatorios')

        }

        if (this.products.some((prod) => prod.code === product.code)) {
            throw new Error(' El Producto Ya Existe')
        }
        this.id++
        const newProduct = { id: this.id, ...product }
        this.products.push(newProduct)
    }

    getProductById = async (id) => {
        const products = await this.getProducts()
        const product = products.find(product => product.id === id)
        if (product) {
            return (product)
        } else {
            return ('el producto no exíste')
        }
    }

    updateProduct = async (id, obj) => {
        const products = await this.getProducts();
        const productIn = products.findIndex((p) => p.id === id);
        if (productIn === -1) {
            return console.log("product not found");
        }
        const productUpdated = { ...products[productIn], ...obj };
        products.splice(productIn, 1, productUpdated);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return console.log("product updated");
    }

    deleteProducts = async () => {
        if (fs.existsSync(this.path)) {
            await fs.promises.unlink(this.path);
            return "products deleted";
        } else {
            return "file doesn't exist";
        }
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const newProductsArray = products.filter((p) => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newProductsArray));
        console.log("product deleted");
    }

    #generarId = (products) => {
        let id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
        return id
    }
}

async function add() {
    const manager = new ProductManager(path)
    await manager.addProduct('Parlantes JBL', 'Parlantes JBL de 15"', 13000, 'Imágen No Disponible', 60)
    await manager.addProduct('Pantalla Gigante', 'Ideal para proyectar videoClips durante la fiesta', 23000, 'Imágen No Disponible', 2)
    await manager.addProduct('Iluminación LED', 'Todo en iluminación para fiestas', 950, 'Imágen No Disponible', 13)
    await manager.addProduct('Monitores Studio Rokit', 'Monitores de Studio alto rendimiento', 250, 'Imágen No Disponible', 23)

    
    const products = await manager.getProducts();
}

add()

async function getById() {
    const manager = new ProductManager(path);
    console.log(await manager.getProductById(3))
    console.log(await manager.getProductById(11))
}

getById()

async function deleteById() {
    const manager = new ProductManager(path);
    await manager.deleteProduct(3);
}

async function deleteAll() {
    const manager = new ProductManager(path);
    await manager.deleteProducts();
}

async function update() {
    const manager = new ProductManager(path);
    await manager.updateProduct(3, { price: 550 });
    await manager.updateProduct(2, { stock: 10 });
}
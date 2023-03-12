const fs = require('fs')
const path = 'productos.json'

class ProductManager {
    #servicios = 0.65
    constructor(path) {
        this.products = [],
            this.id = 0,
            this.path = path
    }

    getProducts = async () => {
        if (fs.existsSync(path)) {
            const fileRead = await fs.promises.readFile('productos.json', 'utf-8')
            const product = JSON.parse(fileRead.toString())

            return (product)
        } else {
            console.log('El Archivo No Existe');
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

        let data =  JSON.stringify(this.products);
        fs.writeFileSync('productos.json', data);
    }

    getProductById = async (id) => {
        const products = await this.getProducts()
        const product = products.find(product => product.id === id)
        if (product) {
            return (product)
        } else {
            return ('El Producto No Exíste')
        }
    }

    updateProduct = async (id, obj) => {
        const products = await this.getProducts();
        const productIn = products.findIndex((p) => p.id === id);
        if (productIn === -1) {
            return console.log("Product Not Found");
        }
        const productUpdated = { ...products[productIn], ...obj };
        products.splice(productIn, 1, productUpdated);
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        return console.log("Product UpDated");
    }

    deleteProducts = async () => {
        if (fs.existsSync(this.path)) {
            await fs.promises.unlink(this.path);
            return "Products Deleted";
        } else {
            return "The File No Exist";
        }
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const newProductsArray = products.filter((p) => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newProductsArray));
        console.log("Product Deleted");
    }

    #generarId = () => {
        let id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
        return id
    }
}

async function add() {
    const manager = new ProductManager(path)
    await manager.addProduct('Parlantes JBL', 'Parlantes JBL de 15"', 1000000, 'Imágen No Disponible', 60),
    await manager.addProduct('Pantalla Gigante', 'Ideal para proyectar videoClips durante la fiesta', 23000, 'Imágen No Disponible', 2),
    await manager.addProduct('Iluminación LED', 'Todo en iluminación para fiestas', 950, 'Imágen No Disponible', 13),
    await manager.addProduct('Monitores Studio Rokit', 'Monitores de Studio alto rendimiento', 250, 'Imágen No Disponible', 23),
    await manager.addProduct('Pantalla Gigante', 'Pantalla LED de 300 pulgadas 4k', 47250, 'Imágen No Disponible', 4)
    await manager.addProduct('DJ', 'https://djcarloshermida.com.uy', 13000, 'Imágen No Disponible', 1)

    const products = manager
    
}

add()

async function getById() {
    const manager = new ProductManager(path);
    console.log(await manager.getProductById(6))
    console.log(await manager.getProductById(1))
}

getById()

async function deleteById() {
    const manager = new ProductManager(path);
    await manager.deleteProduct(1);
}

deleteById()

async function deleteAll() {
    const manager = new ProductManager(path);
    await manager.deleteProducts();
}

async function update() {
    const manager = new ProductManager(path);
    await manager.updateProduct(1, { price: 9999999 })
}

update()

console.log(fs.existsSync('productos.json'));
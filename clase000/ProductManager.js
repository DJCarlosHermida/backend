const fs = require('fs')
const path = 'productos.json'

//fs.promises.writeFile('info.json', JSON.stringify(info))

class ProductManager {
    #servicios = 0.65
    constructor(path) {
        this.products = [],
            this.id = 0,
            this.path = path
    }

    getProducts = async () => {
        if (fs.existsSync(path)) {
            const products = await fs.promises.readFile(this.path, 'utf-8')
            const product = JSON.parse(products.toString())

            return JSON.parse(products)
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
        let data = JSON.stringify(this.products);
        fs.writeFileSync('productos.json', data);
    }

    getProductById = async (id) => {
        const productsFile = await this.getProducts()
        const product = productsFile.find(product => product.id === id)
        if (product) {
            return product
        } else {
            return ('El Producto No Exíste')
        }
    }

    updateProduct = async (id, obj) => {
        const productsFile = await this.getProducts();
        const productIn = productsFile.findIndex((p) => p.id === id);
        if (productIn === -1) {
            return console.log("No se encontró producto");
        }
        const productUpdated = { ...productsFile[productIn], ...obj };
        productsFile.splice(productIn, 1, productUpdated);
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
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
        console.log("product deleted")
        console.log(products)
    }

    #generarId = (products) => {
        let id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
        return id
    }
}

async function add() {
    const manager = new ProductManager(path)
    await manager.addProduct('Parlantes', 'Parlantes JBL de 15"', 1000000, 'Imágen No Disponible', 60)
    await manager.addProduct('Pantalla Gigante', 'Ideal para proyectar videoClips durante la fiesta', 23000, 'Imágen No Disponible', 2)
    await manager.addProduct('Iluminación', 'Todo en iluminación para fiestas', 950, 'Imágen No Disponible', 13)
    await manager.addProduct('Monitores Studio Rokit', 'Monitores de Studio alto rendimiento', 250, 'Imágen No Disponible', 23)
    await manager.addProduct('Pantalla Gigante', 'Pantalla LED de 300 pulgadas 4k', 47250, 'Imágen No Disponible', 4)
    await manager.addProduct('Micrófonos', 'Micrófono SHURE 58 alto rendimiento', 250, 'Imágen No Disponible', 4)
    await manager.addProduct('Laser', 'Laser para discoteca, alta potencia color azul', 470, 'Imágen No Disponible', 4)
    await manager.addProduct('Pista LED', 'Pista LED varios tamaños', 7250, 'Imágen No Disponible', 4)
    await manager.addProduct('DJ', 'https://djcarloshermida.com.uy', 13000, 'Imágen No Disponible', 1)
    await manager.addProduct('Esctructura', 'Estructura en aluminio, arañas, escenarios, cabinas', 35000, 'Imágen No Disponible', 1)
    await manager.addProduct('DJ', 'Bola De Espejos', 3000, 'Imágen No Disponible', 2)
    await manager.addProduct('Micrófonos', 'Micrófono Berhinger B!', 1000, 'Imágen No Disponible', 2)
    await manager.addProduct('Pantalla LED', 'Pantalla gigante LED', 13000, 'Imágen No Disponible', 2)
    await manager.addProduct('Parlantes', 'Parlantes JBL 18"', 12000, 'Imágen No Disponible', 2)
    await manager.addProduct('DJ', 'Máquina de humo', 160, 'Imágen No Disponible', 2)
    await manager.addProduct('DJ', 'Tachos LED', 1500, 'Imágen No Disponible', 2)
    await manager.addProduct('Parlantes', 'Monitores', 2000, 'Imágen No Disponible', 2)
    await manager.addProduct('Iluminación', 'Robóticas', 3000, 'Imágen No Disponible', 2)
    await manager.addProduct('DJ', 'Karaoke', 4000, 'Imágen No Disponible', 2)
    await manager.addProduct('Iluminación', 'Iluminación', 5000, 'Imágen No Disponible', 2)
    await manager.addProduct('DJ', 'Servicio de Discoteca', 13000, 'Imágen No Disponible', 2)
    await manager.addProduct('DJ', 'Servicio de dj', 13000, 'Imágen No Disponible', 30)
    await manager.addProduct('DJ', 'Iluminación', 13000, 'Imágen No Disponible', 51)
}

add()

async function getById() {
    const manager = new ProductManager(path);
    console.log(await manager.getProductById(1))
}

getById()

async function deleteById() {
    const manager = new ProductManager(path);
    await manager.deleteProduct();
}

deleteById()

async function deleteAll() {
    const manager = new ProductManager(path);
    await manager.deleteProducts();
}


async function update() {
    const manager = new ProductManager(path);
    await manager.updateProduct(21, { stock: 1 })
}

update()

console.log(fs.existsSync('productos.json'));

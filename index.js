class ProductManager {
    #servicios = 0.65
    constructor() {
        this.products = []
    }

    getProduct() {
        try {
            console.log(this.products);
        } catch (error) {
            console.log(`No se pudo cargar los productos: ${error.message}`);
        }
    }

    addProduct(title, description, price, thumbnail = 'imágen no disponible', stock = 30) {
        const product = {
            id: this.#generarId(),
            title: title,
            description: description,
            price: (price / this.#servicios).toFixed(),
            thumbnail,
            stock,
            code: 2023 + this.#generarId()
        }
        this.products.push(product)

    }

    getProductById(id) {
        return this.products.find(this.products.id(1))
    }
    
    #generarId() {
        const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
        return id
    }
}

const manager = new ProductManager()
manager
manager.addProduct('Parlantes JBL', 'Parlantes JBL de 15"', 13000, 'Imágen No Disponible', 60)
manager.addProduct('Pantalla Gigante', 'Ideal para proyectar videoClips durante la fiesta', 23000, 'Imágen No Disponible', 2)
manager.addProduct('Iluminación LED', 'Todo en iluminación para fiestas', 950, 'Imágen No Disponible', 13)
manager.addProduct('Monitores Studio Rokit', 'Monitores de Studio alto rendimiento', 250, 'Imágen No Disponible', 23)
console.log(manager);
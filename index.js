class ProductManager {
    #servicios = 0.65
    constructor() {
        this.products = [],
        this.id = 0
    }

    getProducts() {
        // if (this.products.length == 0) {
        //     throw new Error('No Hay Productos')
        // }
        return this.products
        
    }
    
    addProduct(title, description, price, thumbnail = 'imágen no disponible', stock = 30){
        const product = {
            id: this.#generarId(),
            title: title,
            description: description,
            price: (price / this.#servicios).toFixed(2),
            thumbnail,
            stock,
            code: 2023 + this.#generarId()
        }
        if (!product.price || !product.title || !product.description || !product.thumbnail || !product.stock || !product.code){
            console.log('Error: Campos Obligatorios')
                return
        }
        if (this.products.some((prod) => prod.code === product.code)) {
            console.log('Error: El Producto Ya Existe');
        }
        this.id++
        const newProduct = {id: this.id, ...product}
        this.products.push(newProduct)
    }

    getProductById(id) {
        const product = this.products.find((prod) => prod.id === id)
            if (product) {
                return product
            } else {
                console.log('Error: No se encontró producto!');
            }
    }

    #generarId() {
        const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
        return id
    }
}

const manager = new ProductManager()
manager.addProduct('Parlantes JBL', 'Parlantes JBL de 15"', 13000, 'Imágen No Disponible', 60)
manager.addProduct('Pantalla Gigante', 'Ideal para proyectar videoClips durante la fiesta', 23000, 'Imágen No Disponible', 2)
manager.addProduct('Iluminación LED', 'Todo en iluminación para fiestas', 950, 'Imágen No Disponible', 13)
manager.addProduct('Monitores Studio Rokit', 'Monitores de Studio alto rendimiento', 250, 'Imágen No Disponible', 23)
console.log('Productos: ',manager.getProducts());
console.log('Producto Id 1: ',manager.getProductById(1));
console.log('Producto Id 2: ',manager.getProductById(2));
console.log('Producto Id 3: ',manager.getProductById(3));
console.log('Producto Id 4: ',manager.getProductById(4));
console.log(manager.getProductById(5));

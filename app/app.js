import express from "express";
import ProductManager from "./ProductManager.js";


const app = express()
const productManager = new ProductManager('./products.json')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/products', async (req, res) =>{

    const products = await productManager.getProducts()

    res.json({ products })
})

app.post('./products', async(req, res) => {
    const obj = req.body
    console.log('información', obj);
    const newProduct = await productManager.createProduct(obj)
    res.json({message: 'Producto Created', prodct: newProduct })
})





app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
})
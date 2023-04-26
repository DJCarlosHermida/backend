import express from "express";
import ProductManager from "./ProductManager.js";

const app = express()
const productManager = new ProductManager('./products.json')
app.use(express.json())
app.use(express.urlencoded( {extended: true}) )

app.get('/products', async (req, res) => {
    const products = await productManager.getProducts()
    const limit = req.query.limit
    if (!limit) {
      res.json(products)
    } else {
      const limitProd = products.slice( 0, limit )
      res.json(limitProd)
    }
})

app.get('/products/:idProd', async (req, res) => {
  const { idProd } = req.params
  const product = await productManager.getProductById( + idProd )
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({error: "NO PRODUCT,  Sorry"})
  }
})

app.post('/products', async(req, res) => {
    const obj = req.body
    console.log('información', obj);
    const newProduct = await productManager.createProduct(obj)
    res.json({message: 'Producto Created', prodct: newProduct })
})

app.put('/products/:idProd', async (req, res) => {
    const { idProd: idProd } = req.params
    const obj = req.body
    const product = await productManager.updateProduct(+idProd, obj)
    res.json({ product })
  })
  
  app.delete('/products', async (req, res) => {
    const message = await productManager.deleteProducts()
    res.json({ message })
  })
  
  app.delete('/products/:pid', async (req, res) => {
    const { idProd: idProd } = req.params
    const message = await productManager.deleteProductById(+idProd)
    res.json({ message })
  })

app.listen(8080, () => {
    console.log('Listening to 8080 Port');
})
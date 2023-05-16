import { Router } from "express";
import ProductManager from "../manager/ProductManager.js";

const productManager = new ProductManager('./products.json')
const router = Router()

router.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    const limit = req.query.limit
    if (!limit) {
      res.json(products)
    } else {
      const limitProd = products.slice( 0, limit )
      res.json(limitProd)
    }
})

router.get('/:idProd', async (req, res) => {
  const { idProd } = req.params
  const product = await productManager.getProductById( + idProd )
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({error: "NO PRODUCT,  Sorry"})
  }
})

router.post('/', async(req, res) => {
    const obj = req.body
    console.log('información', obj);
    const newProduct = await productManager.createProduct(obj)
    res.json({message: 'Producto Created', prodct: newProduct })
})

router.put('/:idProd', async (req, res) => {
    const { idProd: idProd } = req.params
    const obj = req.body
    const product = await productManager.updateProduct(+idProd, obj)
    res.json({ product })
  })
  
  router.delete('/', async (req, res) => {
    const message = await productManager.deleteProducts()
    res.json({ message })
  })
  
  router.delete('/:idProd', async (req, res) => {
    const { idProd: idProd } = req.params
    const message = await productManager.deleteProductById(+idProd)
    res.json({ message })
  })


export default router
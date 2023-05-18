import { Router } from "express";
import CartManager from "../manager/CartManager.js"

const cartManager = new CartManager('./carts.json')
const router = Router()

router.get('/', async (req, res) => {
    const carts = await cartManager.getCarts()
    const limit = req.query.limit
    if (!limit) {
        res.json(carts)
    } else {
        const limitCart = carts.slice( 0, limit )
        res.json(limitCart)
    }
})

router.get('/idCart', async (req, res) => {
    const {idCart} = req.params
    const cart = await cartManager.getCartsById( + idCart)
    if (cart) {
        res.json(cart)
    } else {
        res.status(404).json({ error: "No Cart, i am sorry for u" })
    }
})

router.post('/', async(req, res) => {
    const obj = req.body
    console.log('information', obj);
    const newCart = await CartManager.crateCart(obj)
    res.json( {message: 'Cart Created', cart: newCart})
})

export default router
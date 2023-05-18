import { Router } from "express";
import productsRouter from "./products.router.js"
import cartRouter from "./cart.router.js"

const router = Router()

router.use("/products", productsRouter)
router.use("/carts", cartRouter)


export default router
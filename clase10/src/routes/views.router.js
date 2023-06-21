import { Router } from "express";

const router = Router()

router.get('/views', (req,res) => {
    res.render('socket')
})

export default router
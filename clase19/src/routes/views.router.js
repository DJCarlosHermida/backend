import { Router } from "express"

const router = Router()

router.get('/', (req, res) => {
    if (req.session.username){
        res.redirect('/users/test')
        return
    }
    res.render('login')
})

export default router
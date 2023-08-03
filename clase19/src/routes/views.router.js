import { Router } from "express"

const router = Router()

router.get('/', (req, res) => {
    if (req.session.email){
        res.redirect('/users/test')
        return
    }
    res.render('login')
})

router.get('/signup', ( req, res ) => {
    res.render('signup')
})

router.get('/signupSuc', ( req, res ) => {
    res.render('signupSuc')
})

export default router
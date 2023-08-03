import {Router} from 'express'
import {usersModel} from '../db/models/users.model.js'
import {generateToken} from '../utills.js'
import { jwtValidation } from '../middlewares/jwt.middleware.js'
import passport from 'passport'

const router = Router()

router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    const user = await usersModel.findOne({email})
    if(!user){
        return res.send('User does not exist')
    }
    const token = generateToken({id:user._id,email})
    res.json({message:'Login',token})
})

router.get('/login',jwtValidation,async(req,res)=>{

    res.send(`User ${req?.user?.email} logged`)
})

router.post('/loginCookies',async(req,res)=>{
    const {email,password} = req.body
    const user = await usersModel.findOne({email})
    if(!user){
        return res.send('User does not exist')
    }
    const token = generateToken({id:user._id,email})
    res.cookie('token',token).json({message:'Login'})
})

router.get('/loginPassport',passport.authenticate('jwt', { session: false }),(req,res)=>{
    res.send(`User ${req.user.email} logged`)
})

export default router
import { Router } from "express";
import { UserManager } from "../UsersManager.js";
import { __dirname } from "../utils.js";

const router = Router()
const userManager = new UserManager(__dirname + '/users.json')

router.post('/', async(req, res) => {
    await userManager.createUser(req.body)
    res.redirect('/views/listaRegistro')
})

export default router
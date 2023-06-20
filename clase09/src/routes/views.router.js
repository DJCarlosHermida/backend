import { Router } from "express";
import { UserManager } from "../UsersManager.js";
import { __dirname } from "../utils.js";

const router = Router()
const userManager = new UserManager(__dirname + '/users.json')
 const users = [
    
 {
     nombre: 'Gigi',
         apellido: 'D`Agostino',
             edad: 24,
                 correo: 'gdagostino@yo.com',
                     telefono: 156165165
 },
 {
     nombre: 'Benny',
         apellido: 'Benassi',
             edad: 37,
                 correo: 'bbenassi@yo.com',
                     telefono: 11616121
 },
 {
     nombre: 'Jennifer',
         apellido: 'López',
             edad: 36,
                correo: 'jlopez@yo.com',
                     telefono: 98101775
 },
 {
     nombre: 'Marc',
         apellido: 'Anthony',
             edad: 72,
                 correo: 'manthony@yo.com',
                     telefono: 156165165
 },
 {
     nombre: 'Ricardo',
         apellido: 'Arjona',
             edad: 54,
                 correo: 'rarjona@yo.com',
                     telefono: 156165165
 }
 
 ]

router.get('/', (req, res) => {
    const indice = Math.floor(Math.random() * 4)
    const usuario = users[indice]
    res.render('actividad1', { ...usuario })
})

router.get('/lista', (req, res) => {
    res.render('lista', { users })
})

router.get('/registro', (req, res) => {
    res.render('registro')
})

router.get('/listaRegistro', async (req, res) => {
    const users = await userManager.findUsers()
    res.render('listaRegistro', {users})
})

export default router
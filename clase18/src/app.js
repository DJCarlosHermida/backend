import express from 'express'
import cookieParser from 'cookie-parser'
import loginRouter from './routes/login.router.js'
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import session from 'express-session'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* COOKIES */
app.use(cookieParser('SecretCookie'))

/* HANDLEBARS */
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

/* SESSION */
app.use(session({
    secret: 'secretSession',
    cookie: {maxAge: 1000}
}))

app.use('/views', viewsRouter)
app.use('/login', loginRouter)

app.get('/createCookie', (req, res) => {
    res.cookie('cookie10', 'DEMO Cookie', { maxAge: 10000 }).send('Saved Cookie')
})

app.get('/readCookie', (req, res) => {
    const { cookie1, cookie2, cookie3 } = req.cookies
    res.json({ message: 'Reading Cookies', cookie1, cookie2, cookie3 })
    console.log(req.cookies)
})

app.get('/deleteCookie', (req, res) => {
    res.clearCookie('cookie4').send('Cookie Deleted')
})

app.get('/ signCookie', (req, res) => {
    res.cookie('SignCookie1', 'First Sign Cookie', { signed: true }).send('Sign Cookie')
})

app.listen(3000, () => {
    console.log('Listening to 3000 PORT')
})
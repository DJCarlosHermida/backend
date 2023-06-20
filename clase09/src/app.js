import express from 'express'
import { __dirname } from './utils.js'
import handlbars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

//config
app.engine('handlebars', handlbars.engine())

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.send('Bienvenidos')
})

app.get('/primera', (req, res) => {
    res.render('primera')
})

app.get('/segunda', (req, res) => {
    res.render('segunda')
})

app.use('/views', viewsRouter)
app.use('/users', usersRouter)

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
})



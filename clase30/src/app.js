import express from 'express'
import config from './config.js'
import messagesRouter from './routes/messages.router.js'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('views engine', 'handlebars')

app.use('/messages', messagesRouter)
app.use('/views engine', viewsRouter)

const PORT = config.port
app.listen(PORT, ()=> {
    console.log(`Listening to the PORT ${PORT}`)
})
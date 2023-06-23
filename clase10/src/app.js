import express, { response } from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extender: true}))
app.use(express.static(__dirname + '/public'))

/* HANDLEBARS */
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

/* ROUTES */
app.use('/views', viewsRouter)

const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
})

/* SOCKET */
const messages = []

const socketServer = new Server(httpServer)

/* MAIN EVENT */
socketServer.on('connection', (socket) => {
    console.log(`Client Connected ID: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Client Disconnected ID: ${socket.id}`);
    })

    socket.emit('welcome', `Welcome to WEBSOCKET client ID: ${socket.id}`)
    socket.on('answerWelcome', (response) => {
        console.log(response);
    })

    socket.on('message', message => {
        messages.push({clientId: socket.id, message})
        socketServer.emit('allMessages', messages)
    } )

    
})
import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extender: true }))
app.use(express.static(__dirname + '/public'))

// HANDLEBARS

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//ROUTES
app.use('/views', viewsRouter)

const PORT = 8080

const httpServer = app.listen(PORT, () => {
  console.log(`Listeting to PORT: ${PORT}`)
})

// SOCKET

const messages = []
const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
  console.log('Client Connected');
  socket.on('Disconnect', () => {
  })

  socket.emit(
    'Welcome',
    `Welcome TO WEBSOCKET CLIENT ID: ${socket.id}`
  )
  socket.on('respuesta Welcome', (response) => {
  })
// hola
  socket.on('message', (message) => {
    messages.push({ clientId: socket.id, message })
    socketServer.emit('allMessages', messages)
  })
})
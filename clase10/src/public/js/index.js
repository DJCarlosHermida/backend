const socketClient = io()

socketClient.on('Bienvenida', (text) => {
  socketClient.emit('Respuesta de Bienvenida', 'Gracias por la bienvenida')
})

const formulario = document.getElementById('formulario')
const inputMessage = document.getElementById('message')
formulario.onsubmit = (e) => {
  e.preventDefault()
  socketClient.emit('message', inputMessage.value)
}

socketClient.on('allMessages',messages=>{
    console.log(messages);
})


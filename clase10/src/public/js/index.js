/* GREETING */
console.log('testing websocket by DJ');

const socketClient = io()

socketClient.on('welcome', (text) => {
    console.log(text);
socketClient.emit('answerWelcome', 'Thank you for welcome')
})

const form = document.getElementById('form')
const inputMessage = document.getElementById('message')
form.onsubmit = (e) => {
    e.preventDefault()
    socketClient.emit('message', inputMessage.value)
}

socketClient.on('allMessages', messages => {
    console.log(messages);
})
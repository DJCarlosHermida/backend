import express from 'express'
import config from './config.js'
import { fork } from 'child_process'

const app = express()

let visits = 0
app.get('/', (req, res) => {
    res.send(`The number of visits is ${visits++}`)
})

function sumar() {
    let suma = 0
    for (let i = 0; i < 5e9; i++) {
        suma += 1
    }
    return suma
}

app.get('/block-calculus', (req, res) => {
    const resultSum = sumar()
    res.send(`The result of sum is ${resultSum}`)
})

app.get('/noblock-calculus', (req, res) => {
    const chilProcess = fork('./src/childProcess.js')
    chilProcess.send('Calculate')
    chilProcess.on('message', resultSum => {
        res.send(`The result of sum is ${resultSum}`)
    })
})

const PORT = config.PORT

app.listen(PORT, () => {
    console.log(`Listening to the PORT ${PORT}`);
})
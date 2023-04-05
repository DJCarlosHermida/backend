import express from 'express'

const app = express()
/* req.params - req.query - req.body */

app.get('/', (req, res) => {
    res.send('Saludos desde Express')
})

app.get('/productos/:idProd', (req, res) => {
    res.send('Litado de productos')
})

app.get('/usuarios', (req, res) => {
    res.send('Listado de usuarios')
})

app.get('/carrito', (req, res) => {
    res.send('Carrito')
})

app.listen(8080, () => {
    console.log('Listening to 8080 port');
})
import express, { query } from 'express'

const app = express()

app.get('/', (req, res) => {
    console.log(req.query);
    const { limit, order } = req.query
    console.log(limit, order);
    res.send ('Welcome from Express')
})

app.get('/products/', (req, res) => {
    console.log(req.params);
    res.send ('List of Products')
})

app.get('/products/:pid', (req, res) => {
    res.send ('Product By ID')
app.get('/products/:idProd', (req, res) => {
    res.send ('Products By ID')
})

app.listen(8080, ()=> {
    console.log('Listening to 8080 port from Express')
})


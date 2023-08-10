import express from 'express'
import './persistencia/dbConfig.js'
import usersRouter from './routes/users.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', usersRouter)

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Listening to the ${PORT}`);
})
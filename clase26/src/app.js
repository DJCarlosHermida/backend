import express from 'express'
import config from './config.js'
import toysRouter from './routes/toy.router.js'
import usersRouter from './routes/users.router.js'
import './DAL/dbConfig.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/toys', toysRouter)
app.use('/users', usersRouter)

const PORT = config.port 

app.listen(PORT, ()=> {
    console.log(`Listening to the PORT: ${PORT}`);
})
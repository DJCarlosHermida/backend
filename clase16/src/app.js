import express from 'express'
import usersRouter from './routes/users.router.js'
import coursesRouter from './routes/courses.router.js'

import './db/dbConfig.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', usersRouter)
app.use('/courses', coursesRouter)

app.listen(8080, () => {
    console.log('Listening to 8080 PORT');
})
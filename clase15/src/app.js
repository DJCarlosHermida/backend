import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import studentsRouter from './routes/students.router.js'
import './db/dbConfig.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CONFIGURATION STATIC FILES
app.use(express.static(__dirname + '/public'))

// TEMPLATE ENGINE CONFIGURATION
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// ROUTES
app.use('/students', studentsRouter)

app.listen(8080, () => {
    console.log('Listen to 8080 PORT');
})
import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser' 
import studentsRouter from './routes/students.router.js' 
import coursesRouter from './routes/courses.router.js'
import './db/dbConfig.js'
import './passport/passportStrategies.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// CONFIGURATION STATIC FILES
app.use(express.static(__dirname + '/public'))

// SESSION
app.use(session({
    store: new MongoStore({
        mongoUrl: 'mongodb+srv://djcarloshermida:djmongodb@djcarloshermida.iiimagn.mongodb.net/?retryWrites=true&w=majority'
    }),
    secret: 'sessionMongoKey'
}))

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())

// TEMPLATE ENGINE CONFIGURATION
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// ROUTES
app.use('/students', studentsRouter)
app.use('/courses', coursesRouter)

app.listen(8080, () => {
    console.log('Listen to 8080 PORT');
})
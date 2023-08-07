import express from 'express'
import session from 'express-session'
import FileStore from 'session-file-store'
import cookieParser from 'cookie-parser'
import { __dirname } from './utills.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.router.js'
import jwtRouter from './routes/jwt.router.js'
import './db/configDB.js'
import './passport/passportStrategies.js'
import passport from 'passport'
import mongoStore from 'connect-mongo'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* HANDLEBARS */
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

/* COOKIE */
app.use(cookieParser())

/* SESSION */
const fileStore = FileStore(session)

/* FILESTORE */
/*
app.use(
    session({
    store: new fileStore({
        path: __dirname + '/sessions'
    }),
    secret: 'SessionKey',
    cookie: {
        maxAge: 120000,
    },
})
)
*/
/* MONGODB */
app.use(
    session({
        store: new mongoStore({
            mongoUrl:
            // FALTA URI MONGO
            'mongodb+srv://djcarloshermida:djmongodb@djcarloshermida.iiimagn.mongodb.net/mongoose1DB?retryWrites=true&w=majority'
        }),
        secret: 'SessionKey',
        cookie: {
            maxAge: 120000
        },
    })
)

/* PASSPORT */
app.use(passport.initialize())
app.use(passport.session())


/* ROUTES */
app.use('/views', viewsRouter)
app.use('/users', usersRouter)
app.use('/jwt', jwtRouter)

app.listen(8080, () => {
    console.log('Listening to 8080 PORT');
})
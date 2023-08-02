import express from 'express'
import session from 'express-session'
import FileStore from 'session-file-store'
import cookieParser from 'cookie-parser'
import { __dirname } from './utills.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* HANDLEBARS */
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

/* COOKIE */
app.use(cookieParser())

const fileStore = FileStore(session)

app.use(
    session({
    store: new fileStore({
        path: __dirname + '/sessions'
    }),
    secret: 'SessionKey',
    cookie: {
        maxAge: 120000,
    }
})
)

/* ROUTES */
app.use('/views', viewsRouter)
app.use('/users', usersRouter)

app.listen(8080, () => {
    console.log('Listening to 8080 PORT');
})
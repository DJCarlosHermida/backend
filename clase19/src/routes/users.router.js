import { Router } from "express"

const router = Router()

const users = [
    {
        username: 'carlos1',
        password: 'admin123',
        email: 'admin@dj'
    },
    {
        username: 'lucia1',
        password: '12345'
    },
    {
        username: 'renato',
        password: '12345'
    }
]

router.post('/', (req, res) => {
    const { username, password } = req.body
    const user = users.find(
        (u) => u.username === username && u.password === password)
    if (!user) {
        return res.json({ message: 'User not found' })
    }
    req.session['username'] = username
    req.session['password'] = password
    if (email === 'admin@dj' && password === 'admin123'){
        req.session['isAdmin'] = true
    } else {
        req.session['isAdmin'] = false
    }
    res.json({ message: 'User found' })
})

router.get('/test', (req, res) => {
    console.log(req.session);
    if (req.session?.username) {
        res.send(`Welcome ${req.session?.email}`)
        return
    }
    res.redirect('/views')
})

router.get('/loggout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/views')
    })
})

export default router
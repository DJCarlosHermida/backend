import { Router } from "express";

const router = Router()

router.post('/', (req, res) => {
  const { username, password } = req.body
  console.log(username, password);

  req.session['username'] = username
  req.session['password'] = password
  res.send('Welcome')
})

export default router
import { Router } from 'express'
import CoursesManager from '../daos/coursesManager.js'

const router = Router()
const coursesManager = new CoursesManager()

router.get('/:idCourse', async(req, res) => {
    const {idCourse} = req.params
    const course = await coursesManager.findCourse(idCourse)
    res.json({course})
})

router.post('/', async(req, res) => {
    const course = await coursesManager.createCourse(req.body)
    res.json({message: 'Course Created', course})
})

export default router
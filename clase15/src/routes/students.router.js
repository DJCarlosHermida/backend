import { Router } from 'express'
//import StudentsManager from '../Dao/studentsManagerFS.js'
import StudentsManager from '../Dao/studentsManagerMongo.js'

const studentsManager = new StudentsManager()
const router = Router()

router.get('/', async (req, res) => {
    const students = await studentsManager.getAllStudents()
    res.json({ message: 'Students', students })
})

router.post('/', async (req, res) => {
    const newStudent = await studentsManager.createStudent(req.body)
    res.json({message: 'Student Created', student: newStudent})
})

export default router
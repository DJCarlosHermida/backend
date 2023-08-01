import { Router } from 'express';
import StudentsManager from '../daos/studentsManager.js'
import { __dirname } from '../utils.js'
import fs from 'fs'

const router = Router()
const path = __dirname + '/data/Students.json'
const studentsManager = new StudentsManager()

router.get('/add', async (req, res) => {
    const studentsData = await fs.promises.readFile(path, 'utf-8')
    await studentsManager.addStudents(JSON.parse(studentsData))
    res.json({ message: 'Students Added' })
})

router.get('/aggregation', async (req, res) => {
    const response = await studentsManager.aggregationFun()
    res.json({ response })
})

export default router
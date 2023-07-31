import fs from 'fs'
import { __dirname } from '../utils.js'

const path = __dirname + '/Students.json'

export default class StudentManager {
    async getAllStudents() {
        if (fs.existsSync(path)) {
            try {
                const studentsFile = await fs.promises.readFile(path, 'utf-8')
                return JSON.parse(studentsFile)
            } catch (error) {
                console.log(error);
            }
        } else {
            return []
        }

    }

    async createStudents(objStudent) {
        try {
            const allStudents = await this.getAllStudents()
            let id
            if (allStudents.length === 0) {
                id = 1
            } else {
                id = allStudents[allStudents.length - 1].id + 1
            }

            const newStudent = { id, ...objStudent }
            allStudents.push(newStudent)
            await fs.promises.writeFile(path, JSON.stringify(allStudents))
            return newStudent
        } catch (error) {
            console.log(error)
        }
    }
}
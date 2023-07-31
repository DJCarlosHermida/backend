import { studentsModel } from '../db/models/students.models.js'

export default class StudentsManager {
    async getAllStudents() {
        try {
            const allStudents = await studentsModel.find()
            return allStudents
        } catch (error) {
            console.log(error);
        }
    }

    async createStudent(objStudent) {
        try {
            const newStudent = await studentsModel.create(objStudent)
            return newStudent
        } catch (error) {
            console.log(error)
        }
    }
} 
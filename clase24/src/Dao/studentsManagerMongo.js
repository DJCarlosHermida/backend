import { studentsModel } from '../db/models/students.model.js'

export default class StudentsManager {
  async getAll() {
    try {
      const allStudents = await studentsModel.find().populate('course')
      return allStudents
    } catch (error) {
      console.log(error)
    }
  }

  async getOneById(idStudent) {
    try {
      const student = await studentsModel
        .findOne({ _id: idStudent })
        .populate('course')
      return student
    } catch (error) {
      console.log(error)
    }
  }

  async createOne(objStudent) {
    try {
      const newStudent = await studentsModel.create(objStudent)
      return newStudent
    } catch (error) {
      console.log(error)
    }
  }

  async updateOne(idStudent, obj) {
    // obj = {first_name: 'Andres', dni:'1234566'}
    try {
      const response = studentsModel.updateOne({_id:idStudent},{$set:obj})
      return response
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOne(idStudent) {
    try {
      const response = await studentsModel.deleteOne({ _id: idStudent })
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

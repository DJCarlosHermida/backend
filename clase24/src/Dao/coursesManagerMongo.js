import { coursesModel } from '../db/models/courses.model.js'

export default class CoursesManager {
  async getAll() {
    try {
      const allCourses = await coursesModel.find().populate('students')
      return allCourses
    } catch (error) {
      console.log(error)
    }
  }

  async getOneById(idCourse) {
    try {
      const course = await coursesModel
        .findOne({ _id: idCourse })
        .populate('students')
      return course
    } catch (error) {
      console.log(error)
    }
  }

  async createOne(objCourse) {
    try {
      const newCourse = await coursesModel.create(objCourse)
      return newCourse
    } catch (error) {
      console.log(error)
    }
  }

  async updateOne(idCourse, obj) {
    try {
      const response = coursesModel.updateOne({ _id: idCourse }, { $set: obj })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async deleteOne(idCourse) {
    try {
      const response = await coursesModel.deleteOne({ _id: idCourse })
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

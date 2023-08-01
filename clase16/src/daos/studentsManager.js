import { studentsModel } from "../db/models/students.model.js";

export default class StudentsManager {
    async addStudents(students) {
        try {
            await studentsModel.create(students)
            return 'Students Added'
        } catch (error) {
            console.log(error);
        }
    }

    async aggregationFun() {
        try {
            const response = await studentsModel.aggregate([
                { $match: { calificacion: { $gt: 3 } } },
                { $group: {_id: '$gender', gender_count: {$count:{}}, promedio_calificación: {$avg: '$calificacion'}}},
                {$sort: {promedio_calificación: -1}}
            ])
            return response
        } catch (error) {

        }
    }
}
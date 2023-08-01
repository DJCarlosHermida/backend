import mongoose from 'mongoose'

const coursesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    ]
})

export const coursesModel = mongoose.model('Courses', coursesSchema)
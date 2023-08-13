import mongoose from "mongoose"

const studentsSchema = new mongoose.Schema({
    first_Name: {
        type: String,
        required: true
    },
    last_Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    dni: {
         type: String,
         required: true,
         unique: true
    },
    password: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.SchemaTypes.ObjectId,
        required: 'Courses',
        default: null
    }
})

export const studentsModel = mongoose.model('Students', studentsSchema)
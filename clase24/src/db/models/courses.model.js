import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    students: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Students',
            default: []
        },
    ],
})

export const coursesModel = mongoose.model('Courses', coursesSchema)
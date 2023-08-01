import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
    },
})

export const usersModel = mongoose.model('Users', usersSchema)
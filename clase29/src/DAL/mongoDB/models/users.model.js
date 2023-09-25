import mongoose from "mongoose"

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    orders: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Orders'}],
})

export const usersModel = mongoose.model('Users', usersSchema)
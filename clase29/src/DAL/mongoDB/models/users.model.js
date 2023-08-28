import mongoose, { mongo } from "mongoose"

const userSchema = new mongoose.Schema({
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
    orders: {
        type: mongoose.SchemaType.ObjectId, ref: 'Orders'
    }
})

export const usersModel = mongoose.model('Users', userSchema)
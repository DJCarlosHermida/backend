import mongoose from 'mongoose'

const ordersSchema = new mongoose.Schema({
    order_number: {
        type: Number,
        required: true
    },
    business: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Business'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users'
    },
    products: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Products' }],
    price: {
        type: Number,
        required: true
    }
})

export const ordersModel = mongoose.model('Orders', ordersSchema)
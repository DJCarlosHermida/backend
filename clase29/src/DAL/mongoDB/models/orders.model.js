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
    price: {
        type: Number,
        required: true
    },
    products: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Products' }]
})

export const ordersModel = mongoose.model('Orders', ordersSchema)
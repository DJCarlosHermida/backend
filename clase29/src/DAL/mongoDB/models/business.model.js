import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    products: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Products' }],
})

export const businessModel = mongoose.model('Business', businessSchema)
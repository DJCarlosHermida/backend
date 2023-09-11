import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    products: [{ type: mongoose.SchemaType.ObjectId, ref: 'Products' }],
})

export const businessModel = mongoose.model('Business', businessSchema)
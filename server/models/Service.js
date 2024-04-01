import { update } from "firebase/database";
import mongoose from "mongoose";
const { Schema } = mongoose;

const ServiceSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now, required: true },
    serviceType: {
        type: String,

    },
});

const Service = mongoose.model('Service', ServiceSchema);

export default Service;

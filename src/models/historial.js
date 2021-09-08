import { Schema, model } from "mongoose";

const historialClinico = new Schema(
    {
        data: {
            type: Schema.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: Date,
            default: new Date()
        },
        subject: {
            type: String,
            required: true,
            trim: true
        },
        abstract: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    })

export default model('MedicalHistory', historialClinico)
import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const usuarioSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        rol: {
            type: Schema.ObjectId,
            ref: "Rol"
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        birth: {
            type: Date
        },
        gender: {
            type: String,
            enum: ["Masculino", "Femenino", "No binario"]
        },
        phone: {
            type: Number
        },
        avatar: {
            url: String
        },
        historyClinical: [{
            type: Schema.Types.ObjectId,
            ref: 'MedicalHistory'
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

usuarioSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

usuarioSchema.statics.comparePassword = async (password, receivePassword) => {
    return await bcrypt.compare(password, receivePassword)
}

export default model('User', usuarioSchema)
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
        phone: {
            type: Number
        },
        avatar: {
            url: String
        }
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
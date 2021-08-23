import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const usuarioSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        rol: {
            type: Schema.ObjectId,
            ref: "Rol"
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: Number
        },
        avatar: {
            type: String,
            default: 'http://assets.stickpng.com/images/585e4beacb11b227491c3399.png'
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
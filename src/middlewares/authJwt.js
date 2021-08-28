import jwt from 'jsonwebtoken'
import User from '../models/usuario'
import Rol from '../models/roles'
import { SECRET } from '../config'

module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers.token
            if (!token) {
                return res.status(403).send({
                    message: 'No token'
                });
            }
            const decoded = jwt.verify(token, SECRET)
            req.userId = decoded.id

            const user = await User.findById(req.userId, { password: 0 })
            if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

            next()
        } catch (error) {
            return res.status(500).send({
                message: 'Sin permisos'
            });
        }
    },
    verifyPaciente: async (req, res, next) => {
        const user = await User.findById(req.userId)
        const roles = await Rol.find({ _id: { $in: user.rol } })

        for (const property of roles) {
            if (property.name === 'Paciente' || property.name === 'Doctor' || property.name === 'Admin') {
                next()
                return
            }
        }
        return res.status(403).json({ message: 'Usuario sin permisos de paciente' })

    },
    verifyDoctor: async (req, res, next) => {
        const user = await User.findById(req.userId)
        const roles = await Rol.find({ _id: { $in: user.rol } })

        for (const property of roles) {
            if (property.name === 'Doctor' || property.name === 'Admin') {
                next()
                return
            }
        }
        return res.status(403).json({ message: 'Usuario sin permisos de doctor' })

    },
    verifyAdministrador: async (req, res, next) => {
        const user = await User.findById(req.userId)
        const roles = await Rol.find({ _id: { $in: user.rol } })
        for (const property of roles) {
            if (property.name === 'Admin') {
                next()
                return
            }
        }
        return res.status(403).json({ message: 'Usuario sin permisos de administracion' })
    },
}
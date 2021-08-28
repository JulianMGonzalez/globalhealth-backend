import usuarioSchema from '../models/usuario'
import roles from '../models/roles'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config'
import validateRegisterInput from '../validation/register'
import validateLoginInput from '../validation/login'

module.exports = {
    add: async (req, res, next) => {
        try {
            // Form validation
            const { errors, isValid } = validateRegisterInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { name, email, password, rol } = req.body

            const register = await usuarioSchema.findOne({ email })
            if (register) {
                return res.status(400).json({ email: "Email ya existe" });
            } else {
                const newUser = new usuarioSchema({
                    name,
                    email,
                    password: await usuarioSchema.encryptPassword(password)
                });

                if (rol) {
                    const foundRol = await roles.findOne({ name: { $in: rol } })
                    newUser.rol = foundRol._id
                } else {
                    const role = await roles.findOne({ name: 'Paciente' })
                    newUser.rol = role._id
                }

                const savedUser = await newUser.save()

                res.status(200).json({ mensaje: 'Registro exitoso' })
            }
        } catch (error) {
            res.status(500).send({ //500 error con el servidor
                message: 'Error -> servidor'
            })
            next(error);
        }
    },
    login: async (req, res) => {
        try {
            // Form validation
            const { errors, isValid } = validateLoginInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }

            const { email, password } = req.body

            const userFound = await usuarioSchema.findOne({ email }).populate("rol")

            if (!userFound) return res.status(400).json({ mensaje: 'Usuario no registrado' })

            const matchPassword = await usuarioSchema.comparePassword(password, userFound.password)
            if (!matchPassword) return res.status(401).json({ mensaje: 'contraseña incorrecta' })

            const token = jwt.sign({ id: userFound._id }, SECRET, {
                expiresIn: 86400 //24 horas
            })
            res.json({ token })

        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            const list = await usuarioSchema.find()
            if (list) {
                res.status(200).json(list);
            } else {
                res.status(404).send({//404: usuario no encontrado
                    message: 'usuarios no registrados'
                })
            }


        } catch (error) {
            res.status(500).send({ //500 error con el servidor
                message: 'Error -> servidor'
            })
            next(error);
        }
    },
    profile: async (req, res) => {
        const user = await usuarioSchema.findOne({ _id: req.userId }).select('-password')

        if (!user) return res.status(401).json({ message: 'El usuario no existe' })

        res.json(user)
    },

    update: async (req, res, next) => {
        try {
            const updateUser = await usuarioSchema.findByIdAndUpdate(req.params.id, { $set: req.body })
            if (updateUser) {
                res.status(200).json(updateUser);
            } else {
                res.status(404).json(updateUser)
            }

        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    delete: async (req, res, next) => {
        try {
            const deleteUser = await usuarioSchema.findByIdAndRemove(req.params.id)
            if (deleteUser) {
                res.status(200).json(deleteUser);
            } else {
                res.status(404).json(deleteUser)
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    }
}
import usuarioSchema from '../models/usuario'
import roles from '../models/roles'
import jwt from 'jsonwebtoken'
import config from '../config'

module.exports = {
    add: async (req, res, next) => {
        try {
            const { name, email, password, rol } = req.body

            const register = await usuarioSchema.findOne({ email })
            if (register) {
                return res.status(400).json({ email: "Email already exists" });
            } else {
                const newUser = new usuarioSchema({
                    name,
                    email,
                    password: await usuarioSchema.encryptPassword(password)
                });

                if (rol) {
                    const foundRol = await roles.find({ name: { $in: rol } })
                    newUser.rol = foundRol.map(rol => rol._id)
                } else {
                    const role = await Rol.findOne({ name: 'Paciente' })
                    newUser.rol = [role._id]
                }

                const savedUser = await newUser.save()
                const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
                    expiresIn: 86400 //24 horas
                })
                console.log(newUser)
                res.status(200).json({token})
            }



        } catch (error) {
            res.status(500).send({ //500 error con el servidor
                message: 'Error -> servidor'
            })
            next(error);
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
            const reg = await usuarioSchema.findByIdAndRemove(req.params.id)
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    }
}
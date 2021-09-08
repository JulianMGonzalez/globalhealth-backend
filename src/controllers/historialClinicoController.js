import historialSchema from "../models/historial";
import usuarioSchema from '../models/usuario'
import createError from "http-errors";

module.exports = {
    list: async (req, res, next) => {
        try {
            const list = await historialSchema.find()
            if (list) {
                res.status(200).json(list);
            } else {
                next(createError.NotFound('Historiales no encontrados'))
            }
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const { data } = req.body
            const user = await usuarioSchema.findById(data)

            const historialCreated = await historialSchema.create(req.body)
            if (historialCreated) {
                user.historyClinical = user.historyClinical.concat(historialCreated)
                await user.save()
                res.status(200).json(historialCreated)
            }
            else next(createError.NotFound('Historial clinico no creado'))
        } catch (error) {
            next(error)
        }
    },
    activate: async (req, res, next) => {
        try {
            const history = await historialSchema.findByIdAndUpdate(req.params.id, {
                $set: { state: true }
            })
            if (history) {
                res.status(200).json(history);
            } else {
                createError.BadRequest('Error al cambiar de estado')
            }

        } catch (error) {
            createError.InternalServerError('Error en servidor')
            next(error);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            const history = await historialSchema.findByIdAndUpdate(req.params.id, {
                $set: { state: false }
            })
            if (history) {
                res.status(200).json(history);
            } else {
                createError.BadRequest('Error al cambiar de estado')
            }

        } catch (error) {
            createError.InternalServerError('Error en servidor')
            next(error);
        }
    }
}
const Rol = require('../models/roles')

module.exports = {
    createRoles: async () => {
        try {
            const count = await Rol.estimatedDocumentCount()

            if (count > 0) return

            const values = await Promise.all([
                new Rol({ name: 'Paciente' }).save(),
                new Rol({ name: 'Admin' }).save(),
                new Rol({ name: 'Doctor'}).save()

            ])
            console.log(values)
        } catch (error) {
            console.error(error)
        }

    }
}
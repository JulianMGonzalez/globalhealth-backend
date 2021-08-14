const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rolSchema = new Schema({
    name: {
        type: String,
    }
},
    {
        versionKey: false
    })
module.exports = mongoose.model('Rol', rolSchema)
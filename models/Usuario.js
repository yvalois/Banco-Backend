const mongoose = require('../db/Basedatos')

const Schema = mongoose.Schema

const UsuarioSchema = new Schema({
    nombre: String,
    id: Number,
    nacimiento: String,
    expedicion: String,
    ingresos: Number,
    egresos: Number,
    pass: String
})

const Usuario = mongoose.model('usuarios', UsuarioSchema)

module.exports = Usuario
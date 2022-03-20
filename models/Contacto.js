const mongoose = require('../db/Basedatos')

const Schema = mongoose.Schema

const ContactoSchema = new Schema({
    nombre: String,
    correo: String,
    asunto: String,
    mensaje: String
})

const Contacto = mongoose.model('mensajes_clientes', ContactoSchema)

module.exports = Contacto
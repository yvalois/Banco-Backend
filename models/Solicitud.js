const mongoose = require('../db/Basedatos')

const Schema = mongoose.Schema

const SolicitudSchema = new Schema({
    codigo: String,
    id_user:Number,
    comentarios: String,
    valor: Number,
    cuotas: Number,
    prorroga: Boolean,
    razon_prorroga: Number,
    cuotas_prorroga: Number,
    estado_prorroga: Number,
    cuotas_pagadas: Number,
    cuotas_pendientes: Number,
    cuota_capital: Number,
    interes: Number,
    estado_solicitud: Number,
})

const Solicitud = mongoose.model('solicitudes', SolicitudSchema)

module.exports = Solicitud
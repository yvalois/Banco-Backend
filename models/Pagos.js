const mongoose = require('../db/Basedatos')

const Schema = mongoose.Schema

const PagoSchema = new Schema({
    codigo_pago: String,
    codigo_credito: String,
    id_user:Number,
    valor: Number,
    cuotas_pendientes: Number,
    valor_cuota: Number,
    cuota_pagada:Number,
    fecha: String
})

const Pago = mongoose.model('pagos', PagoSchema)

module.exports = Pago
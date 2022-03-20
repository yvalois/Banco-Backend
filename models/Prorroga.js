const mongoose = require('../db/Basedatos')

const Schema = mongoose.Schema

const ProrrogaSchema = new Schema({
    codigo: String,
    id_user:Number,
    razon: String,
    cuotas: Number,
    estado_prorroga: Number,
    cuotas_pagadas: Number,
    cuotas_pendientes: Number,
    cuota_capital: Number,
    interes: Number,
})

const Prorroga = mongoose.model('prorrogas', ProrrogaSchema)

module.exports = Prorroga
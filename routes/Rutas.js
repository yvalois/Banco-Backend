const express = require('express')

const Usuario = require('../models/Usuario')
const Solicitud = require('../models/Solicitud')
const Contacto = require('../models/Contacto')
const { findById } = require('../models/Usuario')
const Prorroga = require('../models/Prorroga')
const Pago =require ('../models/Pagos')
const res = require('express/lib/response')

const rutas = express.Router()

const solicitudes = async () => {
    const solicitudes = await Solicitud.find()
    return solicitudes
}

const usuarios = async ()=>{

    const usuarios=await Usuario.find()
    return usuarios
}

rutas.get('/get_solicitud', async (req, res) => {
    res.json(await solicitudes())
})

rutas.get('/get_usuarios/:id', async (req, res)=>{
const id = req.params.id

const usuario = await Usuario.findOne({id:id})

    res.json(usuario)
})


rutas.put('/actualizar_solicitud1/:codigo_id', async (req, res) => {
    const _id = req.params.codigo_id

    const solicitud = await Solicitud.findOne({_id:_id})

    solicitud.estado_solicitud = req.body.estado_solicitud

    await solicitud.save()

    res.json({mensaje: "solicitud aprobada correctamente"})

})

rutas.put('/actualizar_prorroga/:p_id', async (req, res) => {
    const _id = req.params.p_id

    const solicitudpro = await Solicitud.findOne({_id:_id})

    solicitudpro.estado_prorroga = req.body.estado_prorroga
    await solicitudpro.save()

    res.json({mensaje: "solicitud aprobada correctamente"})

})

rutas.post('/crear_solicitud', async (req, res) => {
    let solicitud = new Solicitud(req.body)
    await solicitud.save()

    res.json({mensaje: "Solicitud creada correctamente. ¡IMPORTANTE! En el siguiente mensaje se le notificará de su codigo unico de solicitud. Guardelo para futuras referencias."})
})
rutas.post('/crear_solicitudp', async (req, res) => {
    let prorroga = new Prorroga(req.body)
    await prorroga.save()

    res.json({mensaje: "Solicitud creada correctamente. ¡IMPORTANTE! En el siguiente mensaje se le notificará de su codigo unico de solicitud. Guardelo para futuras referencias."})
})

rutas.get('/get_solicitud/:id_solicitud', async (req, res) => {
    const id_solicitud = req.params.id_solicitud

    const solicitud = await Solicitud.findOne({codigo:id_solicitud})
    if (!solicitud){
        res.json({mensaje: "La solicitud buscada no existe"})
    }else{
        res.json(solicitud)
    }
})

rutas.post('/crear_pago', async (req, res) => {
    let pago = new Pago(req.body)
    await pago.save()

    res.json({mensaje: "Pago registrado correctamente. A continuación se generará la referencia de pago."})
})



rutas.put('/actualizar_cuota/:id_solicitud', async (req, res) => {
    const id_solicitud = req.params.id_solicitud

    const solicitud = await Solicitud.findOne({codigo:id_solicitud})

    solicitud.cuotas_pendientes = req.body.cuotas_pendientes
    solicitud.cuotas_pagadas = req.body.cuotas_pagadas
    solicitud.valor = req.body.valor

    await solicitud.save()

    res.json({mensaje: "Estado de crédito actualizado correctamente."})

})

rutas.post('/contacto_cliente', async (req, res) => {
    let contacto = new Contacto(req.body)
    await contacto.save()

    res.json({mensaje: "Mensaje enviado correctamente"})
})

rutas.put('/actualizar_usuario/:id_usuario', async (req, res) => {
    const id_usuario = req.params.id_usuario

    const usuario = await Usuario.findOne({id:id_usuario})

    usuario.nombre = req.body.nombre
    usuario.nacimiento = req.body.nacimiento
    usuario.ingresos = req.body.ingresos
    usuario.egresos = req.body.egresos

    await usuario.save()

    res.json({mensaje: "Usuario actualizado correctamente"})

})

rutas.put('/actualizar_solicitud/:id_solicitud', async (req, res) => {
    const id_solicitud = req.params.id_solicitud

    const solicitud = await Solicitud.findOne({codigo:id_solicitud})

    solicitud.prorroga = req.body.prorroga
    solicitud.razon_prorroga = req.body.razon_prorroga
    solicitud.cuotas_prorroga = req.body.cuotas_prorroga

    await solicitud.save()

    res.json({mensaje: "Prorroga solicitada correctamente. La solicitud sera revisada. Consulte en 5 dias habiles con el codigo del crédito."})

})


module.exports = rutas
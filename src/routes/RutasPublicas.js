const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/Usuario')

const rutas = express.Router()


rutas.post('/crear_usuario', async (req, res) => {
    let datos_usuario = req.body

    let salt = await bcrypt.genSalt(10)
    let password = await bcrypt.hash(datos_usuario.pass, salt)

    datos_usuario = {
        ...datos_usuario,
        pass: password
    }

    let usuario = new Usuario(datos_usuario)
    await usuario.save()

    res.json({mensaje: "Usuario creado correctamente"})
})


rutas.post('/login', async (req, res) => {

    let user = req.body.id

    let usuario_bd = await Usuario.findOne({id: user})

    if (!usuario_bd) {
        return res.json({
            mensaje: "Usuario no existe"
        })
    } else {
        let password = req.body.pass

        let validar_password = await bcrypt.compare(password, usuario_bd.pass)

        if (!validar_password) {
            return res.json({
                mensaje: 'Clave invalida'
            })
        }
    }

    token = jwt.sign({
        id: usuario_bd._id,
        usuario: usuario_bd.id
    }, process.env.SECRETO_JWT)

    return res.json({
        mensaje: "Bienvenido",
        usuario: usuario_bd,
        token
    })

})

rutas.post('/verificar', async (req, res) => {

    let user = req.body.id

    let usuario_bd = await Usuario.findOne({id: user})

    if (!usuario_bd) {
        return res.json({
            mensaje: "Usuario no existe"
        })
    } else {
        let password = req.body.pass

        let validar_password = await bcrypt.compare(password, usuario_bd.pass)

        if (!validar_password) {
            return res.json({
                mensaje: 'La clave consignada no corresponde a la actual'
            })
        }
    }
    return res.json({
        mensaje: true,
    })

})

rutas.put('/actualizar_contrasena/:id_usuario', async (req, res) => {
    const id_usuario = req.params.id_usuario

    const usuario = await Usuario.findOne({id:id_usuario})

    let newpass = req.body.newpass

    let salt = await bcrypt.genSalt(10)
    let password = await bcrypt.hash(newpass, salt)

    usuario.pass = password

    await usuario.save()

    res.json({mensaje: "Contraseña actualizada correctamente"})

})

module.exports = rutas
require('module-alias/register')
const express = require('express')
const router = express.Router()
const EmailSuportTecnico = require('../helpers/SubmitEmailSuporte')
const { auth } = require('@helpers/auth')

router.get('/email', auth, (req, res) => {
    let subject = ''
    let motivo = ''
    EmailSuportTecnico.ChamadoSuporteTech(subject, motivo).then(() => {
        req.flash('success_msg', 'Pedido de contato com o suporte técnico, caso deseje mais rápido ligue para (xx)33223322')
        res.redirect('/')
    })
})


module.exports = router
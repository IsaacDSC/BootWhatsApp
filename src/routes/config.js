const express = require('express')
const router = express.Router()

const Delivery = require('@models/RoteDelivery')

router.get('/delivery', (req, res) => {
    res.render('config/entrega')
})

router.post('/delivery', (req, res) => {
    Delivery.create({
        city: req.body.cidade,
        neighborhoods: req.body.bairro,
        cost: req.body.valor,
        timeDelivery: req.body.tempoEspera
    }).then(() => {
        req.flash('success_msg', 'Configurações sobre Entregas Salva com Sucesso')
        res.render('/config')
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = router
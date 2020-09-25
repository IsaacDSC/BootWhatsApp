const express = require('express')
const router = express.Router()

const Delivery = require('@models/RoteDelivery')

router.get('/', (req, res) => {
    res.render('config/config')
})

router.get('/delivery', (req, res) => {
    res.render('config/entrega')
})

router.post('/delivery', (req, res) => {
    //res.send(req.body.tempoEspera)
    Delivery.create({
        neighborhoods: req.body.bairro,
        cost: req.body.valor,
    }).then(() => {
        req.flash('success_msg', 'Configurações sobre Entregas Salva com Sucesso')
        res.render('/config')
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = router
const express = require('express')
const router = express.Router()

const Entregas_Config = require('@models/Config_Entrega')

router.get('/entregas', (req, res) => {
    res.render('config/entrega')
})

router.post('/entregas', (req, res) => {
    Entregas_Config.create({
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        valor: req.body.valor,
        tempoEspera: req.body.tempoEspera
    }).then(() => {
        req.flash('success_msg', 'Configurações sobre Entregas Salva com Sucesso')
        res.render('/config')
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = router
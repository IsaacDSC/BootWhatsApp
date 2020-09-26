require('module-alias/register')
const express = require('express')
const router = express.Router()
const Config = require('@models/Config')

const Delivery = require('@models/RoteDelivery')
const { isUpperCase } = require('@/public/vendors/datatables.net-bs4/pdfmake/build/pdfmake')

router.get('/', (req, res) => {
    res.render('config/config')
})

router.post('/', (req, res) => {
    console.log(req.body.class)
    let classe = req.body.class.toUpperCase()
    console.log(classe)
    Config.create({
        classMenu: classe
    }).then(() => {
        req.flash('success_msg', 'Classe Salva com Sucesso')
        res.redirect('/config')
    }).catch((err) => {
        req.flash('error_msg', "Preencha o campo corretamente")
        res.redirect('/config')
        console.log(err)
    })

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
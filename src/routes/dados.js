require('module-alias/register')
const express = require('express')
const router = express.Router()
const data = require('@data/data')
const graficos = require('@helpers/Graficos')

router.get('/lucros', (req, res) => {
    //graficos.GraficoLucros()
    //graficos.clients()
    //graficos.status()
    res.render('dados/lucros', { alert: 'ola mundo' })
})


module.exports = router
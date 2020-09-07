const express = require('express')
const router = express.Router()
const Menu = require('@models/Menu')

router.get('/menu/register', (req, res) => {
    res.render('menu/register')
})

router.post('/menu/register', (req, res) => {
    Menu.create({
        name: req.body.name,
        desc: req.body.desc,
        value: req.body.value,
        costProduce: req.body.costProduce,
        class: req.body.class
    }).then(() => {
        res.send('cardápio cadastrado com sucesso!')
    }).catch((err) => {
        res.send(err)
    })
})

router.get('/menu/views', (req, res) => {
    Menu.findAll().then((menu) => {
        res.render('menu/views', { menu: menu })
    })
})

module.exports = router
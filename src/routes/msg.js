require('module-alias/register')
const express = require('express')
const router = express.Router()
const Messages = require('@models/Messages')
const { auth } = require('@helper/auth')

router.get('/register', auth, (req, res) => {
    res.render('formMSG/register')
})

router.post('/register', (req, res) => {
    /* Messages.createTable() */
    Messages.create({
        stage: req.body.stage,
        message: req.body.message
    }).then(() => {
        req.flash('success_msg', 'Mensagem cadastrada com Sucesso!')
        res.redirect('/msg/register')
    }).catch((err) => {
        req.flash('error_msg', 'Error ao cadastrar menssagem: ' + err)
        res.redirect('/msg/register')
    })
})

router.get('/views', auth, (req, res) => {
    Messages.findAll().then((msg) => {
        res.render('formMSG/view', { msg: msg })
    })
})

router.get('/edit', (req, res) => {
    res.render('formMSG/edit')
})

module.exports = router
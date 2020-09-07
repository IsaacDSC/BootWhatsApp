require('module-alias/register')
const express = require('express')
const router = express.Router()
const Messages = require('@models/Messages')

router.get('/register', (req, res) => {
    res.render('formMSG/register')
})

router.post('/register', (req, res) => {
    /* Messages.createTable() */
    Messages.create({
        stage: req.body.stage,
        message: req.body.message
    }).then(() => {
        res.send('Mensagem cadastrada com sucesso')
    }).catch((err) => {
        res.send(err)
    })
})

router.get('/view', (req, res) => {
    res.render('formMSG/view')
})

router.get('/edit', (req, res) => {
    res.render('formMSG/edit')
})

module.exports = router
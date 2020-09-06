require('module-alias/register')
const express = require('express')
const router = express.Router()
const Users = require('@models/Users')

router.get('/clients', (req, res) => {
    Users.findAll().then((clients) => {
        res.render('clients/clients', { clients: clients })
    })
})

module.exports = router
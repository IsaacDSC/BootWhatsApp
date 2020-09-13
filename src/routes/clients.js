require('module-alias/register')
const express = require('express')
const router = express.Router()
const Users = require('@models/Users')
const { auth } = require('@helpers/auth')

router.get('/clients', auth, (req, res) => {
    Users.findAll().then((clients) => {
        res.render('clients/clients', { clients: clients })
    })
})

module.exports = router
require('module-alias/register')
const express = require('express')
const router = express.Router()
const { auth } = require('@helpers/auth')
const db = require('@database/configSQL')

router.get('/lucro', auth, (req, res) => {
  
        res.render('clients/clients')
    

})

module.exports = router
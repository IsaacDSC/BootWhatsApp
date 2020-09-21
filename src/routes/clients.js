require('module-alias/register')
const express = require('express')
const router = express.Router()
const { auth } = require('@helpers/auth')
const db = require('@database/configSQL')

router.get('/clients/:pag', auth, (req, res) => {
    let desc = req.params.pag
    let sql = `SELECT * FROM users ORDER BY id=${desc} DESC LIMIT 1;`
    db.connection.query(sql, (err, result) => {
        res.render('clients/clients', { clients: result })
    })

})

module.exports = router
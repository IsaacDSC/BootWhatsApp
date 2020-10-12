require('module-alias/register')
const express = require('express')
const router = express.Router()
const { auth } = require('@helpers/auth')
const db = require('@database/configSQL')

router.get('/clients/:pag', auth, (req, res) => {
    let parametro = Number(req.params.pag)
    let sql = `SELECT * FROM users ORDER BY id=${parametro} DESC LIMIT 20;`
    let sql_totalClients = `SELECT COUNT(id) as total FROM users;`
    db.connection.query(sql, (err, result) => {
        db.connection.query(sql_totalClients, (err, totalClientes) => {
            totalClientes.forEach(element => {
                let totalUsers = element.total
                    // console.log(totalUsers)
                    // console.log(parametro)

            });
            res.render('clients/clients', { clients: result, totalClientes: totalClientes })
        })
    })

})

module.exports = router
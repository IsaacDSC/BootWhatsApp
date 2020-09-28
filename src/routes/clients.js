require('module-alias/register')
const express = require('express')
const router = express.Router()
const { auth } = require('@helpers/auth')
const db = require('@database/configSQL')

router.get('/clients/:pag', (req, res) => {
    let parametro = req.params.pag
    let sql = `SELECT * FROM users ORDER BY id=${parametro} DESC LIMIT 10;`
    let sql_totalClients = `SELECT COUNT(id) as total FROM users;`
    db.connection.query(sql, (err, result) => {
            db.connection.query(sql_totalClients, (err, totalClientes) => {
                totalClientes.forEach(element => {
                    console.log(element.total)

                    if (element.total == 0) {
                        console.log('ok')
                    }
                });
                res.render('clients/clients', { clients: result, totalClientes: totalClientes })
            })
        })
        //res.send(parametro)
    console.log(parametro)

})

module.exports = router
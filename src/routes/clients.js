require('module-alias/register')
const express = require('express')
const router = express.Router()
const { auth } = require('@helpers/auth')
const db = require('@database/configSQL')

router.get('/clients/:pag', auth, (req, res) => {
    // if (req.params.pag == +1) {
    //     let id = Number(req.params.pag) + 1
    //     console.log(id)
    //     let sql = `SELECT * FROM users ORDER BY id=${id} DESC LIMIT 1;`
    //     db.connection.query(sql, (err, result) => {
    //         res.render('clients/clients', { clients: result })
    //     })
    // }
    // if (req.params.pag == -1) {
    //     console.log(id)
    //     let id = Number(req.params.pag) - 1
    //     let sql = `SELECT * FROM users ORDER BY id=${id} DESC LIMIT 1;`
    //     db.connection.query(sql, (err, result) => {
    //         res.render('clients/clients', { clients: result })
    //     })
    // } else {
    //     let id = Number(req.params.pag)
    //     let sql = `SELECT * FROM users ORDER BY id=${id} DESC LIMIT 1;`
    //     db.connection.query(sql, (err, result) => {
    //         let id = result[0].id
    //         console.log(result[0].id)
    //         res.render('clients/clients', { clients: result, id: id })
    //     })
    // }
    let id = Number(req.params.pag)
    let sql = `SELECT * FROM users ORDER BY id=${id} DESC LIMIT 1;`
    db.connection.query(sql, (err, result) => {
        let id = result[0].id
        console.log(result[0].id)
        res.render('clients/clients', { clients: result, id: id })
    })

})

module.exports = router
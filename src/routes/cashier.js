const express = require('express')
const router = express.Router()
const db = require('@database/configSQL')
var data = []
router.get('/', async(req, res) => {
    await data.push({ usuario: '123' })
    console.log(data[0].usuario)

    let SQL = `SELECT * FROM users;`
    let SQLCardapios = `SELECT * FROM menus;`
    let SQL_CLient = `SELECT * FROM users WHERE telephone = '${data[0].usuario}';`
    db.connection.query(SQL, (err, users) => {
        db.connection.query(SQLCardapios, (err, cardapios) => {
            db.connection.query(SQL_CLient, (err, clients) => {
                console.log(clients)
                res.render('cashier/cashier', { users: users, cardapios: cardapios, clients: clients[0] })
            })
        })
    })

})

router.post('/', (req, res) => {
    data = []
    data.unshift({ usuario: req.body.telephone })
    res.redirect('/caixa')

    //console.log(data[0].usuario)
})

router.post('/registerUser', (req, res) => {
    let SQL = `UPDATE users SET name = '${req.body.name}', telephone = '${req.body.telephone}', neighborhood = '${req.body.neighborhood}, address = '${req.body.address}', updatedAt= 'TIMESTAMP' WHERE id = '${req.body.id}';`
    db.connection.query(SQL, (err, result) => {
        res.redirect('/caixa')
    })
})

module.exports = router
    //UPDATE `bootwhatsapp`.`users` SET `neighborhood`='ano bom', `address`='rua ary jorge n200' WHERE `id`='1';
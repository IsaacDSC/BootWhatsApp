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

router.post('/pesquisaCliente',async(req,res)=>{
    
    let SQL = `SELECT * FROM users WHERE telephone = '${req.body.telephone}';`
    db.connection.query(SQL, (err, cliente) => {

        res.status(200).send(cliente)
    })
    

})

module.exports = router
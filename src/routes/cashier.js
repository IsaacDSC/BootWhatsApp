const express = require('express')
const router = express.Router()
const db = require('@database/configSQL')
const updateUsers = require('@helpers/updateOrCreate')

router.get('/', async (req, res) => {
    let SQL = `SELECT * FROM users;`
    let SQLCardapios = `SELECT * FROM menus;`
    let SQL_menus = `SELECT DISTINCT class FROM menus;`
    db.connection.query(SQL, (err, users) => {
        db.connection.query(SQL_menus, (err, cardapios) => {
            db.connection.query(SQLCardapios, (err, menus) => {
                res.render('cashier/cashier', { users: users, cardapios: cardapios, menus: menus })
            })
        })
    })

})

router.post('/', (req, res) => {
    data.unshift({ usuario: req.body.telephone })
    res.redirect('/caixa')

    //console.log(data[0].usuario)
})

router.post('/pesquisaClass', (req, res) => {

    let SQL = `select menus.name, menus.value,menus.id from menus where class = '${req.body.class}';`

    db.connection.query(SQL, (err, itensMenu) => {
        res.status(200).send(itensMenu)
    })

})

router.post('/pesquisaCliente', async (req, res) => {

    let SQL = `SELECT * FROM users WHERE telephone = '${req.body.telephone}';`
    db.connection.query(SQL, (err, cliente) => {
        res.status(200).send(cliente)
    })
})

router.post('/registerUser', async(req, res) => {
    try {
          await updateUsers.updateOrCreate(req.body.telephone,{telephone:req.body.telephone,name:req.body.name,stage:0,neighborhood:req.body.neighborhood,address:req.body.address})
    .then(result=>res.send( String(result)))
    } catch (error) {
        console.log(error)
    }
 
})

module.exports = router
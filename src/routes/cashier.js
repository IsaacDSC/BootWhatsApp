const express = require('express')
const router = express.Router()
const db = require('@database/configSQL')
let data = []


router.get('/', async (req, res) => {
    console.log(data)
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

router.post('/registerUser', (req, res) => {
    data = []
    console.log(req.body.id)
    let SQL = `UPDATE users SET name = '${req.body.name}', telephone = '${req.body.telephone}@c.us', neighborhood = '${req.body.neighborhood}', address = '${req.body.address}', updatedAt= CURRENT_TIMESTAMP WHERE id = '${req.body.id}';`
    db.connection.query(SQL, (err, result) => {
        // const content = json.readFile()
        // content.push({ IdUser: req.body.id })
        // json.writeFile(content)
        data.unshift({ UserId: req.body.id })
        res.redirect('/caixa')
    })

})

module.exports = router
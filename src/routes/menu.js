const express = require('express')
const router = express.Router()
const Menu = require('@models/Menu')
const { auth } = require('@helpers/auth')
const db = require('@database/configSQL')

router.get('/menu/register', auth, (req, res) => {
    res.render('menu/register')
})

router.post('/menu/register', auth, (req, res) => {
    Menu.create({
        name: req.body.name,
        desc: req.body.desc,
        value: req.body.value,
        costProduce: req.body.costProduce,
        class: req.body.class
    }).then(() => {
        res.send('cardápio cadastrado com sucesso!')
    }).catch((err) => {
        res.send(err)
    })
})

router.get('/menu/views', (req, res) => {
    let sql_class = `SELECT DISTINCT class FROM menus;`
    let sql = 'SELECT * FROM `menus`;'
    db.connection.query(sql_class, (err, classe) => {
        res.render('menu/views', { class: classe })
            //res.send(result)
    })

})

router.post('/menu/views', (req, res) => {
    let classe = req.body.class
    res.send(classe)
        // if (classe.length > 0) {
        //     let sql_data = `SELECT * FROM menus where = '${classe}';`
        //     db.connection.query(sql_data, (err, data) => {
        //         res.render('menu/views', { data: data })
        //     })
        // } else {
        //     res.send('selecione uma classe')
        // }
})



module.exports = router
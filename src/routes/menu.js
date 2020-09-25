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
    db.connection.query(sql_class, (err, classe) => {
        res.render('menu/views', { class: classe })
            //res.send(result)
    })

})

router.post('/menu/views', (req, res) => {
    let classe = req.body.class
        //res.send(classe)
    if (classe.length > 0) {
        let sql_data = `SELECT * FROM menus where class = '${classe}';`
        db.connection.query(sql_data, (err, data) => {
            let sql_class = `SELECT DISTINCT class FROM menus;`
            db.connection.query(sql_class, (err, classe) => {
                res.render('menu/views', { data: data, class: classe })
            })
        })
    } else {
        res.send('selecione uma classe')
    }
})

router.post('/menu/apagar', (req, res) => {
    //res.send(req.body.id)
    let id = req.body.id
    let SQL = `DELETE FROM menus WHERE (id = '${id}');`
    db.connection.query(SQL, (err, results) => {
        if (err) {
            console.log(err)
            req.flash('error_msg', 'Item não deletado, tente novamente!, Caso o erro persista entre en contato com o técnico')
            res.redirect('/menu/views')
        } else {
            console.log(results)
            req.flash('success_msg', 'Item Removido com succeso!')
            res.redirect('/menu/views')
        }
    })
})

router.post('/menu/editar', (req, res) => {
    //res.send(req.body.id)
    let id = req.body.id
    let SQL = `SELECT * FROM menus WHERE id = '${id}';`
    db.connection.query(SQL, (err, result) => {
        //res.send(result)
        res.render('menu/editar', { result: result })
    })

})
router.post('/menu/editando', (req, res) => {
    //res.send(req.body.name)
    let id = req.body.id
    let SQL = `UPDATE menus SET name= '${req.body.name}', class = '${req.body.class}' ,menus.desc='${req.body.desc}',value='${req.body.value}', costProduce='${req.body.costProduce}',createdAt = 'current_timestamp', updatedAt='current_timestamp' WHERE id='${id}';`
    db.connection.query(SQL, (err, result) => {
        //res.send(result)
        if (err) {
            res.send(err)
        } else {
            res.send('Enviado com sucesso\n' + result)
            console.log(result)
        }
    })

})

module.exports = router
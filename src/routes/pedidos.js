const express = require('express')
const router = express.Router()
const db = require('../database/configSQL')
const { auth } = require('@helpers/auth')


router.post('/pedidos', auth, (req, res) => {
    //res.send(req.body.date)
    let SQL = `SELECT users.name as nome, users.telephone, users.neighborhood, users.address,requests.orderRequest, menus.name, menus.class, menus.desc, menus.value, requests.id,requests.trocoPara, requests.quantity, requests.note, requests.delivery, requests.formPayment,requests.deliveryType, requests.profit, requests.spent, requests.status, requests.createdAt , requests.updatedAt FROM relacionamentos join users on(relacionamentos.UserId = users.id) join menus on( relacionamentos.MenuId = menus.id) join requests on (relacionamentos.PedidosId = requests.id) where date(requests.createdAt) = date('${req.body.date}');`
    db.connection.query(SQL, (err, result) => {
        //console.log(result)
        if (err) {
            res.send('erro ' + result)
                // console.log(result)
                // res.redirect('/pedidos')
        } else {
            // res.send(result)
            res.render('pedidos/pedidos', { pedidos: result })

        }
    })
})

router.get('/pedidos', auth, (req, res) => {
    res.render('pedidos/selecione')
})


router.get('/pedidos/preparo', (req, res) => {
    res.render('pedidos/selecioneEmPreparo')
})
router.post('/pedidos/preparo', (req, res) => {
    let SQL = `SELECT users.name as nome, users.telephone, users.neighborhood, users.address,requests.orderRequest, menus.name, menus.class, menus.desc, menus.value, requests.id,requests.trocoPara, requests.quantity, requests.note, requests.delivery, requests.formPayment,requests.deliveryType, requests.profit, requests.spent, requests.status, requests.createdAt , requests.updatedAt FROM relacionamentos join users on(relacionamentos.UserId = users.id) join menus on( relacionamentos.MenuId = menus.id) join requests on (relacionamentos.PedidosId = requests.id) where date(requests.createdAt) = date('${req.body.date}') AND requests.status = 'Pendente';`
    db.connection.query(SQL, (err, result) => {
        //console.log(result)
        if (err) {
            res.send('erro ' + result)
                // console.log(result)
                // res.redirect('/pedidos')
        } else {
            // res.send(result)
            res.render('pedidos/EmPreparo', { pedidos: result })

        }
    })
})

router.get('/pedidos/entregues', auth, (req, res) => {
    res.render('pedidos/selecioneEntregues')
})
router.post('/pedidos/entregues', auth, (req, res) => {
    let SQL = `SELECT users.name as nome, users.telephone, users.neighborhood, users.address,requests.orderRequest, menus.name, menus.class, menus.desc, menus.value, requests.id,requests.trocoPara, requests.quantity, requests.note, requests.delivery, requests.formPayment,requests.deliveryType, requests.profit, requests.spent, requests.status, requests.createdAt , requests.updatedAt FROM relacionamentos join users on(relacionamentos.UserId = users.id) join menus on( relacionamentos.MenuId = menus.id) join requests on (relacionamentos.PedidosId = requests.id) where date(requests.createdAt) = date('${req.body.date}') AND requests.status = 'Entregue';`
    db.connection.query(SQL, (err, result) => {
        //console.log(result)
        if (err) {
            res.send('erro ' + result)
                // console.log(result)
                // res.redirect('/pedidos')
        } else {
            // res.send(result)
            res.render('pedidos/Entregues', { pedidos: result })

        }
    })
})

router.get('/pedidos/cancelados', auth, (req, res) => {
    res.render('pedidos/selecioneCancelados')
})
router.post('/pedidos/cancelados', auth, (req, res) => {
    let SQL = `SELECT users.name as nome, users.telephone, users.neighborhood, users.address,requests.orderRequest, menus.name, menus.class, menus.desc, menus.value, requests.id,requests.trocoPara, requests.quantity, requests.note, requests.delivery, requests.formPayment,requests.deliveryType, requests.profit, requests.spent, requests.status, requests.createdAt , requests.updatedAt FROM relacionamentos join users on(relacionamentos.UserId = users.id) join menus on( relacionamentos.MenuId = menus.id) join requests on (relacionamentos.PedidosId = requests.id) where date(requests.createdAt) = date('${req.body.date}') AND requests.status = 'Cancelado';`
    db.connection.query(SQL, (err, result) => {
        //console.log(result)
        if (err) {
            res.send('erro ' + result)
                // console.log(result)
                // res.redirect('/pedidos')
        } else {
            // res.send(result)
            res.render('pedidos/Cancelados', { pedidos: result })

        }
    })
})

module.exports = router
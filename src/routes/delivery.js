require('module-alias/register')
const express = require('express')
const router = express.Router()
const db = require('../database/configSQL')
const { auth } = require('@helpers/auth')

router.get('/', auth, (req, res) => {
    let SQL = `SELECT * from deliveries;`
    db.connection.query(SQL, (err, result) => {
        if (err) {
            console.log('Error views delivery: ' + result)
        } else {
            res.render('delivery/viewsDelivery', { delivery: result })
        }
    })

})

router.post('/editar', auth, (req, res) => {
    let SQL = `SELECT * from deliveries where id = ${req.body.id};`
    db.connection.query(SQL, (err, result) => {
        if (err) {
            console.log('Error views delivery: ' + result)
        } else {
            res.render('delivery/editDeliveries', { delivery: result[0] })
        }
    })
})


router.post('/editando', auth, (req, res) => {
    console.log(req.body.neighborhoods, req.body.cost, req.body.id)
    let SQL = `update deliveries set neighborhoods='${req.body.neighborhoods}' ,cost='${req.body.cost}'  where id = '${req.body.id}';`
    db.connection.query(SQL, (err, result) => {
        if (err) {
            console.log('Erro ao Editar deliveries: ' + result)
            req.flash('error_msg', 'Erro ao Editar Configurações de Deliverie')
            res.redirect('/delivery')
        } else {
            req.flash('success_msg', 'Configurações de Deliverie Editado com Sucesso!!!')
            res.redirect('/delivery')
        }
    })
})

router.post('/apagar', auth, (req, res) => {
    let SQL = `delete from deliveries where id = ${req.body.id};`
    db.connection.query(SQL, (err, result) => {
        if (err) {
            console.log('Erro ao Editar deliveries: ' + result)
            req.flash('error_msg', 'Erro ao Deletar Configurações de Deliverie')
            res.redirect('/delivery')
        } else {
            req.flash('success_msg', 'Configurações de Deliverie Apagada com Sucesso!!!')
            res.redirect('/delivery')
        }
    })
})

module.exports = router
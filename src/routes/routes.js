require('module-alias/register')
const express = require('express')
const router = express.Router()
const Admin = require('@models/Admin')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { auth } = require('@helpers/auth')
const Requests = require('@models/Requests')
const User = require('@models/Users')
const Menu = require('@models/Menu')
const db = require('@database/configSQL')
const RegisterUsers = require('@models/RegistersUsers')
const email = require('../helpers/EmailRedefinirSenha')


router.get('/', auth, async (req, res) => {
    let sql = `SELECT users.name as nome, users.telephone, users.neighborhood, users.address, menus.name, menus.class, menus.desc, menus.value, requests.id, requests.quantity, requests.note, requests.delivery, requests.formPayment, requests.profit, requests.spent, requests.status, requests.createdAt, requests.updatedAt FROM relacionamentos join users on(relacionamentos.UserId = users.id) join menus on( relacionamentos.MenuId = menus.id) join requests on (relacionamentos.PedidosId = requests.id) where status = 'Pendente' OR status = 'Preparando' OR status= 'Saiu para Entrega';`
    let countRequest = `SELECT COUNT(distinct  UserId) as createdAt FROM relacionamentos  WHERE DATE(createdAt) = DATE(NOW());`
    let countPreparo = `SELECT COUNT(distinct  IdUsuario) as createdAt FROM requests  WHERE DATE(createdAt) = DATE(NOW()) and status='Preparando';`
    let profitSpent = `SELECT sum(requests.profit) as profit, sum(requests.spent) as spent FROM relacionamentos  join users on(relacionamentos.UserId = users.id) join menus on( relacionamentos.MenuId = menus.id) join requests on (relacionamentos.PedidosId = requests.id) WHERE DATE(requests.createdAt) = DATE(NOW());`
    db.connection.query(sql, (err, result) => {

        var saida = [];

        for (var i = 0; i < result.length; i++) {

            var telehpneIgual = false;

            for (var j = 0; j < i; j++) {
                if (saida[j] && result[i].telephone == saida[j].telephone) {
                    saida[j].pedidos.push({
                        nome: result[i].name,
                        class: result[i].class,
                        value: result[i].value,
                        id: result[i].id,
                        profit: result[i].profit,
                        spent: result[i].spent,
                        quantity: result[i].quantity,
                        note: result[i].note,

                    })
                    telehpneIgual = true;
                    break;
                }
            }

            if (!telehpneIgual) {
                saida.push({
                    telephone: result[i].telephone,
                    nome: result[i].nome,
                    neighborhood: result[i].neighborhood,
                    address: result[i].address,
                    delivery: result[i].delivery,
                    status: result[i].status,
                    formPayment: result[i].formPayment,
                    pedidos: [{
                        nome: result[i].name,
                        class: result[i].class,
                        value: result[i].value,
                        id: result[i].id,
                        profit: result[i].profit,
                        spent: result[i].spent,
                        quantity: result[i].quantity,
                        note: result[i].note,
                    }]
                })
            }
        }



        db.connection.query(countRequest, (err, countRequests) => {
            db.connection.query(countPreparo, (err, countPreparo) => {
                db.connection.query(profitSpent, (err, profitSpent) => {

                res.render('index/index', { requests: saida, countRequests: countRequests[0].createdAt, countPreparo: countPreparo[0].createdAt,profit: profitSpent[0].profit,spent:profitSpent[0].spent})

            })
            })
        })
    });

    //res.render('index/index')

})
router.get('/qrcode', (req, res) => {
    res.render('QrCode/QrCode', { layout: 'QrCode.hbs' })
})

router.get('/profile', (req, res) => {
    res.render('profile/myProfile')
})

router.get('/login', (req, res) => {
    res.render('login/login', { layout: 'login.hbs' })
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'Deslogado com sucesso!')
    res.redirect('/login')
})

router.get('/register', (req, res) => {
    res.render('register/register', { layout: 'login.hbs' })
})

router.get('/register', (req, res) => {
    let businessName = req.body.businessName
    let document = req.body.document
    let name = req.body.name
    let email = req.body.email
    let telephone = req.body.telephone
    let terms = req.body.terms
    if (businessName.length == 0 || document.length == 0 || name.length == 0 || email.length == 0 || telephone.length == 0) {
        req.flash('error_msg', 'Preencha todos os campos corretamente')
        res.redirect('/register')
    }
    if (terms.length == 0) {
        req.flash('error_msg', 'Aceite os termos de contrato')
        res.redirect('/register')
    }
    if (document.length < 18 || document.length > 18) {
        req.flash('error_msg', 'Documento Inválido, Preencha novamente')
        res.redirect('/register')
    } else {
        RegisterUsers.create({
            businessName: businessName,
            document: document,
            name: name,
            email: email,
            telephone: telephone,
            terms: terms
        }).then(() => {
            req.flash('success_msg', 'Em breve entraremos em contato, muito obrigado pela preferência')
            res.redirect('/login')
        }).catch((err) => {
            req.flash('error_msg', 'Preencha os campos corretamente!')
            res.redirect('/register')
        })
    }

})





module.exports = router
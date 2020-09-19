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


router.get('/', auth, (req, res) => {
    //  let sql = 'SELECT users.telephone,menu_requests.quantity, menus.name, menu_requests.formPayment,users.name FROM menus INNER JOIN menu_requests ON menus.id = menu_requests.MenuNameId INNER JOIN users ON users.id = menu_requests.UserId;'
    // let countRequest = `SELECT COUNT(createdAt) as createdAt FROM menu_requests  WHERE DATE(createdAt) = DATE(NOW());`
    // let countPreparo = `SELECT COUNT(status) as status FROM menu_requests  WHERE  DATE(createdAt) = DATE(NOW()) and status = 1;`
    // db.connection.query(sql, (err, result) => {
    //     db.connection.query(countRequest, (err, countRequests) => {
    //     })

    //{ requests: result, countRequests: countRequests[0].createdAt }
    // });

    res.render('index/index')

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

router.get('/reset', (req, res) => {
    const pwd = 'secret(!@#)'
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(pwd, salt, (err, hash) => {
            if (err) {
                res.send('Erro ao criptogradar esta senha: ' + err)
            } else {
                const pass = hash
                Admin.create({
                    name: 'Administrador',
                    email: 'admin@gmail.com',
                    password: pass
                }).then(() => res.send('OK')).catch((err) => {
                    res.send('Erro ao enviar ao banco de dados: ' + err)
                })
            }
        })
    })
})






module.exports = router
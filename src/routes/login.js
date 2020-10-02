require('module-alias/register')
const express = require('express')
const router = express.Router()
const RegisterUsers = require('@models/RegistersUsers')
const email = require('../helpers/EmailRedefinirSenha')
const passport = require('passport')
const { auth } = require('@helpers/auth')
const db = require('@database/configSQL')

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

router.get('/redefinirSenha', (req, res) => {
    let SQL = `SELECT name, email FROM admins`
    db.connection.query(SQL, (err, result) => {
        if (err) {
            console.log(result)
        } else {
            console.log(result[0].email)
            res.render('login/resetSenha', { layout: 'login.hbs', email: result[0].email })
        }
    })
})

router.post('/debug', (req, res) => {
    let ORDER = Math.random().toString(32).substr(2, 9)
        //res.send(req.body.status)
    let sql = `UPDATE requests SET status = '${req.body.status}' WHERE 'id=${req.body.id}';`
    db.connection.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.redirect('/')
        }
    })
})


module.exports = router
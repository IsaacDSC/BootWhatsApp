require('module-alias/register')
const express = require('express')
const router = express.Router()
const RegisterUsers = require('@models/RegistersUsers')
const email = require('../helpers/EmailRedefinirSenha')
const passport = require('passport')
const { auth } = require('@helpers/auth')
const db = require('@database/configSQL')
const resetEmail = require('@helpers/EmailRedefinirSenha')
const Admin = require('@models/Admin')
const bcrypt = require('bcrypt')
let resetConfirm = []
let error = []

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
            let ORDER = Math.random().toString(32).substr(2, 9)
            let email = result[0].email
                //console.log(result[0].email)
            resetConfirm.push({
                code: ORDER
            })
            resetEmail.RedefinirSenha(email, ORDER)
            res.redirect('/confirmCode')
            console.log(resetConfirm)
        }
    })
})
router.get('/confirmCode', (req, res) => {
    if (resetConfirm[0] == undefined) {
        res.redirect('/login')
    } else {
        let SQL = `SELECT email FROM admins`
        db.connection.query(SQL, (err, result) => {
            if (err) {
                console.log(result)
            } else {
                let email = result[0].email
                res.render('login/resetSenha', { layout: 'login.hbs', email: email })
            }
        })
    }

})

router.post('/confirmCode', (req, res) => {
    console.log(resetConfirm)
    if (req.body.code == resetConfirm[0].code) {
        const pwd = req.body.password
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(pwd, salt, (err, hash) => {
                const senha = hash
                if (err) {
                    res.send('Erro ao criptogradar esta senha: ' + err)
                } else {
                    Admin.findOne({ where: { id: 1 } }).then((set) => {
                        set.password = senha,
                            set.save().then(() => {
                                resetConfirm.pop()
                                req.flash('success_msg', 'Senha Redefinida com Sucesso! ' + req.body.password)
                                res.redirect('/login')
                            }).catch((err) => {
                                console.log(err)
                            })
                    })
                }
            })
        })

    } else {
        console.log(error[0])
        if (error[0] == undefined || error[0].err == '' || error[0].err == null || error[0].err == undefined) {
            error.push({
                err: 1
            })
        } else if (error[0].err) {
            error.unshift({
                err: error[0].err + 1
            })
            if (error[0].err >= 3) {
                console.log('Estao Tentando Hackear Esta conta, comportamento Estranho')
                resetConfirm.pop()
            }
        }

        req.flash('error_msg', `${error[0].err}º tentativa, Insira corretamente o código de verificação!`)
        res.redirect('/confirmCode')
    }
})

module.exports = router
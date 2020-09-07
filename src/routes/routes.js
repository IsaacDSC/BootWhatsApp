const express = require('express')
const router = express.Router()
const Admin = require('@models/Admin')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { auth } = require('@helper/auth')

router.get('/', auth, (req, res) => {
    res.render('index/index')
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
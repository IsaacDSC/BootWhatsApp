require('module-alias/register')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const folder = path.resolve(__dirname + '', '../', 'public', 'images', 'avatar')
const multer = require('multer')
const Admin = require('@models/Admin')
const bcrypt = require('bcrypt')
let ADMIN = []
    //config multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file)
        const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
        if (file.mimetype == isAccepted[0] || file.mimetype == isAccepted[1] || file.mimetype == isAccepted[2]) {
            cb(null, folder)
        } else {
            return cb(false)
        }
        //cb(null, folder)

    },
    filename: function(req, file, cb) {
        //function para contar arquivos
        fs.readdir(folder, (err, paths) => {
            //def nomes do arquivos
            cb(null, 'profile.png')
        })
    }
})
const upload = multer({
    storage,
    fileFilter: (req, res, cb) => {
        // console.log(mimeType)
        cb(null, true)

    }
})

router.get('/', (req, res) => {
    Admin.findOne({ where: { id: 1 } }).then((admin) => {
        res.render('profile/myProfile', { admin: admin })
    }).catch((err) => {
        console.log(err)
    })
})

router.post('/', (req, res) => {
    const pwd = req.body.pwd
    if (req.body.pwd == '') {
        req.flash('error_msg', 'Digite a Senha')
        res.redirect('/profile')
    } else {
        Admin.findOne({ where: { id: 1 } }).then((admin) => {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(pwd, salt, (err, hash) => {
                    if (err) {
                        res.send('Erro ao criptogradar esta senha: ' + err)
                    } else {
                        const pass = hash

                        // ADMIN.unshift({
                        //     company: req.body.company,
                        //     name: req.body.company,
                        //     email: req.body.company,
                        //     telphone: req.body.company,
                        //     password: pass,
                        // })
                        console.log(req.body.company + req.body.name + req.body.email + req.body.telephone)
                        admin.company = req.body.company,
                            admin.name = req.body.nameUser,
                            admin.email = req.body.email,
                            admin.telephone = req.body.telephone,
                            admin.password = pass,
                            admin.save().then(() => {
                                req.flash('success_msg', 'Perfil Editado com sucesso')
                                res.redirect('/profile')
                            }).catch((err) => {
                                console.log(err)
                                req.flash('error_msg', 'Erro ao Etitar Perfil')
                                res.redirect('/profile')
                            })
                            // res.redirect('/profile/confirmating')
                    }
                })
            })
        })
    }
})

// router.get('/confirmating', (req, res) => {
//     res.render('profile/confirmating', { layout: 'login.hbs' })
// })

// router.post('/confirmated', (req, res) => {
//     if (req.body.pass == '' || req.body.pass == undefined || req.body.pass == null) {
//         req.redirect('/confirmating')
//     }
//     if (req.body.pass == ADMIN[0].password) {
//         Admin.findOne({ where: { id: 1 } }).then((adm) => {
//             adm.company = ADMIN[0].company,
//                 adm.name = ADMIN[0].name,
//                 adm.email = ADMIN[0].email,
//                 adm.telphone = ADMIN[0].telphone,
//                 adm.password = ADMIN[0].password
//             adm.save().then(() => {
//                 for (i = 0; i < ADMIN.length; i++) {
//                     ADMIN[i] = 0
//                 }
//                 req.flash('success_msg', 'Perfil Editado com sucesso')
//                 res.redirect('/profile')
//             }).catch((err) => {
//                 console.log(err)
//                 req.flash('error_msg', 'Erro ao Etitar Perfil')
//                 res.redirect('/profile')
//             })
//         })
//     } else {
//         for (i = 0; i < ADMIN.length; i++) {
//             ADMIN[i] = 0
//         }
//         req.flash('error_msg', 'Senhas não batem')
//         res.redirect('/profile')
//     }
// })

router.post('/upload', upload.single('img'), (req, res) => {
    res.redirect('/profile')
})






module.exports = router
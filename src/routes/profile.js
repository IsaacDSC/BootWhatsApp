require('module-alias/register')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const folder = path.resolve(__dirname + '', '../', 'public', 'images', 'avatar')
const multer = require('multer')
const Admin = require('@models/Admin')
const bcrypt = require('bcrypt')

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
    res.render('profile/myProfile')
})

router.post('/', (req, res) => {
    Admin.findOne({ where: { id: 1 } }).then((admin) => {
        const pwd = req.body.pwd
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(pwd, salt, (err, hash) => {
                if (err) {
                    res.send('Erro ao criptogradar esta senha: ' + err)
                } else {
                    const pass = hash
                    admin.company = req.body.company,
                        admin.name = req.body.nameUser,
                        admin.email = req.body.email,
                        admin.telphone = req.body.telphone,
                        admin.password = pass,
                        admin.save().then(() => {
                            req.flash('success_msg', 'Perfil Editado com sucesso')
                            res.redirect('/profile')
                        }).catch((err) => {
                            console.log(err)
                            req.flash('error_msg', 'Erro ao Etitar Perfil')
                            res.redirect('/profile')
                        })
                }
            })
        })
    })

})
router.post('/upload', upload.single('img'), (req, res) => {
    res.redirect('/profile')
})







module.exports = router
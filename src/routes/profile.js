require('module-alias/register')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const folder = path.resolve(__dirname + '', '../', 'public', 'images', 'avatar')
const multer = require('multer')

//config multer 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, folder)
        console.log(file)
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
        cb(null, true)
            // if (file.mimetype == "image/jpg") {
            // } else {
            //     cb(null, false)
            // }
    }
})

router.get('/', (req, res) => {
    res.render('profile/myProfile')
})

router.post('/', (req, res) => {
    const company = req.body.company
    const nameUser = req.body.nameUser
    const telphone = req.body.telphone
    const email = req.body.email
    res.send(company, nameUser, telphone, email)
    res.redirect('/profile')
})
router.post('/upload', upload.single('img'), (req, res) => {
    res.redirect('/profile')
})







module.exports = router
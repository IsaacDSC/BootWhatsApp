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
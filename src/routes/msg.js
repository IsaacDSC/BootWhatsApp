const express = require('express')
const router = express.Router()

router.get('/register', (req, res) => {
    res.render('formMSG/register')
})

router.post('/register', (req, res) => {

})

router.get('/view', (req, res) => {
    res.render('formMSG/view')
})

router.get('/edit', (req, res) => {
    res.render('formMSG/edit')
})

module.exports = router
const express = require('express')
const router = express.Router()

router.get('/registermsg', (req, res) => {
    res.render('formMSG/register')
})
router.get('/viewmsg', (req, res) => {
    res.render('formMSG/view')
})
router.get('/editmsg', (req, res) => {
    res.render('formMSG/edit')
})

module.exports = router
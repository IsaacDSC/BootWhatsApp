const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index/index')
})

router.get('/login', (req, res) => {
    res.render('login/login')
})

router.post('/login', (req, res) => {

})

module.exports = router
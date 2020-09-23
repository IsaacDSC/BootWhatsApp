const express = require('express')
const router = express.Router()


router.get('/lucros', (req, res) => {
    res.render('dados/lucros')
})


module.exports = router
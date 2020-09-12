const express = require('express')
const router = express.Router()


router.get('/entregas', (req, res) => {
    res.render('config/entrega')
})


module.exports = router
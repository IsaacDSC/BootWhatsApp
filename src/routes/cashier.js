const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('cashier/cashier')
})



module.exports = router
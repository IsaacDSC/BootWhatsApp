require('module-alias/register')
const express = require('express')
const router = express.Router()
const db = require('@database/configSQL')

router.post('/editar/pedido', (req, res) => {
    const { order } = req.body
    const sql = `Select * from requests where orderRequest = '${order}' and status !='Entregue' and status !='Cancelado';`
   res.send('ok')
})

module.exports = router
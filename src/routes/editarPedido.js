require('module-alias/register')
const express = require('express')
const router = express.Router()
const db = require('@database/configSQL')

router.post('/editar/pedido', (req, res) => {
    const { order } = req.body
    const SQL = `SELECT users.name as nome, users.telephone, users.neighborhood, users.address,requests.orderRequest, menus.name, menus.class, menus.desc, menus.value, requests.id,requests.trocoPara, requests.quantity, requests.note, requests.delivery, requests.formPayment,requests.deliveryType, requests.profit, requests.spent, requests.status, requests.createdAt, requests.updatedAt FROM relacionamentos join users on(relacionamentos.UserId = users.id) join menus on( relacionamentos.MenuId = menus.id) join requests on (relacionamentos.PedidosId = requests.id) where status != 'Entregue' and orderRequest='${order}' ;`
   try {
    db.connection.query(SQL, (err, result) => {
        if(err){
            res.status(400).send(err)
        }else{
            res.send(result)
        }
    })
       
   } catch (error) {
    res.status(400).send(error)
   }

})

module.exports = router
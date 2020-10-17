const express = require('express')
const router = express.Router()
const db = require('../database/configSQL')

router.get('/pedidos', (req, res)=>{
    let SQL = `SELECT distinct requests.createdAt as createdAt FROM requests;`
    db.connection.query(SQL, (err, result)=>{
        console.log(result)
        if(err){
            console.log(result)
            res.redirect('/pedidos')
        }else{
           // res.send(result)
             res.render('pedidos/selecione', {date: result})
        }
    })
})

router.post('/pedidos', (req, res)=>{
        console.log(req.body.date)
    let sql = `SELECT users.name as nome, users.telephone, users.neighborhood, users.address,requests.orderRequest, menus.name, menus.class, menus.desc, menus.value, requests.id,requests.trocoPara, requests.quantity, requests.note, requests.delivery, requests.formPayment,requests.deliveryType, requests.profit, requests.spent, requests.status, requests.createdAt, requests.updatedAt FROM relacionamentos join users on(relacionamentos.UserId = users.id) join menus on( relacionamentos.MenuId = menus.id) join requests on (relacionamentos.PedidosId = requests.id) where status= 'Entregue' AND where createdAt = '${req.body.date}';`
    db.connection.query(sql, (err, result)=>{
        console.log(result)
        if(err){
            console.log(result)
            res.send(result)
            //res.redirect('/pedidos')
        }else{
           // res.send(result)
             res.render('pedidos/pedidos', {pedidos: result})
        }
    })
})


module.exports = router
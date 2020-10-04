require('module-alias/register')
const express = require('express')
const router = express.Router()
const data = require('@data/data')
const graficos = require('@helpers/Graficos')
const db = require('@database/configSQL')

router.get('/lucros', (req, res) => {
   /* let SQL_MaisVendidos = ``
    let SQL = `SELECT relacionamentos.MenuId, menus.name, requests.quantity from relacionamentos join menus on(relacionamentos.MenuId = menus.id) join requests on(relacionamentos.PedidosId = requests.id);`
    db.connection.query(SQL, (err, result) => {
        if (err) {
            console.log(result)
        } else {
            console.log(result)
            result.forEach((element, index) => {
                if (element.name == 'Coca-cola 2L') {
                    console.log(index.length)
                    console.log(element.length)
                }
            })

        }
    })*/
    res.render('dados/lucros')
})

router.post('/grafico',(req,res)=>{ 
    //where requests.status = 'Entregue'
    SQL = `select menus.name, sum(requests.quantity) as quantidade from relacionamentos  join menus on(relacionamentos.MenuId = menus.id) join requests on( relacionamentos.PedidosId = requests.id) 
    GROUP BY menus.name ORDER BY quantidade DESC limit 6;`
    db.connection.query(SQL, (err, result) => {
        if(err){
            return err
        }
        res.status(200).send(result)
    })

})


module.exports = router
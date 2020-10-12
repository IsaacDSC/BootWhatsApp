require('module-alias/register')
const express = require('express')
const router = express.Router()
const data = require('@data/data')
const graficos = require('@helpers/Graficos')
const db = require('@database/configSQL')
const { auth } = require('@helpers/auth')

router.get('/lucros', auth, (req, res) => {
    let sql_admin = `SELECT name, email company, telephone FROM admins;`
    let SQL = `SELECT  (SELECT COUNT(users.id) FROM   users ) AS totalCliente,
    ( SELECT COUNT(users.id) FROM users where DATE(createdAt) = DATE(NOW()) ) AS novosClientes,
    ( SELECT count(requests.id) FROM requests ) AS totalPedidos,
    ( SELECT sum(requests.profit + requests.spent) FROM requests where status='Entregue' ) AS totalVendas,
    ( SELECT sum(requests.profit) FROM requests where status='Entregue') AS totalLucro,
    ( SELECT sum(requests.spent) FROM requests where status='Entregue' ) AS totalDespesa,
    ( SELECT vencimento from configurations ) AS vencimento,
    ( SELECT ROUND(count(distinct requests.orderRequest)*configurations.plano,2) as preco
FROM requests , configurations
WHERE requests.createdAt >= date(configurations.inicio)  and status = 'Entregue' 
 ) AS pagamento`

    db.connection.query(sql_admin, (err, admin) => {
        if (err) {
            console.log(admin)
        } else {
            console.log(admin)
            const adminOne = admin[0]
            console.log(admin[0])
            db.connection.query(SQL, (err, dados) => {
                res.render('grapichs/grapichs', { admin: admin[0], dados: dados[0] })
            })
        }
    })

})

router.post('/grafico', auth, (req, res) => {
    //where requests.status = 'Entregue'
    SQL = `select menus.name, sum(requests.quantity) as quantidade from relacionamentos  join menus on(relacionamentos.MenuId = menus.id) join requests on( relacionamentos.PedidosId = requests.id)
    GROUP BY menus.name ORDER BY quantidade DESC limit 6;`
    db.connection.query(SQL, (err, result) => {
        if (err) {
            return err
        }
        res.status(200).send(result)
    })

})


module.exports = router
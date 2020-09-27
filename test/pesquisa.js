const db = require('../src/database/configSQL')


//let sql = 'SELECT users.telephone,menu_requests.quantity, menus.name, menu_requests.formPayment,users.name FROM menus INNER JOIN menu_requests ON menus.id = menu_requests.MenuNameId INNER JOIN users ON users.id = menu_requests.UserId;'

// let sql = `SELECT * FROM configurations;`
// db.connection.query(sql, (err, results) => {
//     console.log(results)
//     if (results == '' || results == null) {
//         console.log('vazio')
//     }
//     results.forEach((e) => {
//         console.log(e)
//     })

// })

// async function escolhaBairroAtivo() {
//     //let SQL = `SELECT neighborhood FROM configurations;`
//     db.connection.query(SQL, (err, result) => {
//         if (err) {
//             console.log(result)
//         } else {
//             console.log(result)
//             console.log(result[0].neighborhood)
//             console.log('ok')
//         }
//         if (result[0].neighborhood == 'false' || result[0].neighborhood == null) {
//             console.log('opção desativada')
//         }
//     })
// }

// escolhaBairroAtivo()
// let SQL = `SELECT requests.id, users.name, users.telephone, menus.name, menus.class, requests.quantity, requests.createdAt FROM relacionamentos join users on(relacionamentos.UserId = users.id) join menus on( relacionamentos.MenuId = menus.id) join requests on (relacionamentos.PedidosId = requests.id);`
//     //let SQL = `SELECT sum(requests.profit) as profit, sum(requests.spent) as spent FROM relacionamentos  join users on(relacionamentos.UserId = users.id) ;`
// db.connection.query(SQL, (err, result) => {
//     //console.log(result)
//     result.forEach(element => {
//         let SQL_agrupamento = `select menus.id, Max(menus.name) Descricao, Sum(requests.quantity) QtdVendida, Sum(requests.profit) ValorTotal from ProdPedidos;`

//     });
// })

let sql = `SELECT maxCompra FROM configurations;`
db.connection.query(sql, (err, result) => {
    console.log(result)
    if (result[0].maxCompra == null || result[0].maxCompra == '') {

    } else {

    }
})
require('module-alias/register')
const db = require('@database/configSQL')

function maisVendidos() {
    let SQL = ``

    // let SQL_ProdutosVendidos = `SELECT relacionamentos.MenuId, menus.name, requests.quantity from relacionamentos join menus on(relacionamentos.MenuId = menus.id) join requests on(relacionamentos.PedidosId = requests.id);`
    // db.connection.query(SQL_ProdutosVendidos, (err, results) => {
    //     if (err) {
    //         console.log(results)
    //     } else {
    //         // console.log(results)
    //         results.forEach(element => {
    //             let prodVendidos = element
    //             console.log(prodVendidos)
    //                 //fazer pesquisa de produtos mais vendidos
    //             let ProdMaisVendidos = `select sum(requests.${element.quantity}) as MenuId from requests where ${element.name};`
    //             db.connection.query(ProdMaisVendidos, (err, row) => {
    //                 if (err) {
    //                     console.log(row)
    //                 } else {
    //                     console.log(row)
    //                 }
    //             })
    //         });
    //     }
    // })
}

maisVendidos()
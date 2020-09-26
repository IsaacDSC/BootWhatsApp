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

async function escolhaBairroAtivo() {
    let SQL = `SELECT neighborhood FROM configurations;`
    db.connection.query(SQL, (err, result) => {
        if (err) {
            console.log(result)
        } else {
            console.log(result)
            console.log(result[0].neighborhood)
            console.log('ok')
        }
        if (result[0].neighborhood == 'false' || result[0].neighborhood == null) {
            console.log('opção desativada')
        }
    })
}

escolhaBairroAtivo()
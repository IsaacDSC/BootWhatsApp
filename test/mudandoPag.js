require('module-alias/register')
const db = require('@database/configSQL')

function teste() {
    let id = Number(1)
    let sql = `SELECT * FROM users ORDER BY id='${id}' DESC LIMIT 1;`
    db.connection.query(sql, (err, result) => {
        let id = result[0].id
        console.log(result[0].id)
    })
}

teste()
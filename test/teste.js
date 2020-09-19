require('module-alias/register')
const db = require('@database/configSQL')

// let SQL = 'SELECT neighborhoods FROM deliveries'
// let countRequest = `SELECT COUNT(createdAt) as createdAt FROM menu_requests  WHERE createdAt = CURRENT_TIMESTAMP;`
let sql = `SELECT id FROM users where telephone = '5524988094891@c.us';`
db.connection.query(sql, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result[0].id)
    }
})
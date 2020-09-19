require('module-alias/register')
const db = require('@database/configSQL')

//let SQL = 'SELECT neighborhoods FROM deliveries'
let countRequest = `SELECT COUNT(createdAt) as createdAt FROM menu_requests  WHERE createdAt = CURRENT_TIMESTAMP;`
db.connection.query(countRequest, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result[0].createdAt)
        result.forEach(element => {

        });
    }
})
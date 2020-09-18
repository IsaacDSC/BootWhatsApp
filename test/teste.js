require('module-alias/register')
const db = require('@database/configSQL')

let SQL = 'SELECT neighborhoods FROM deliveries'
db.connection.query(SQL, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result)
    }
})
const db = require('../database/configSQL')

function status(status) {
    let SQL = `SELECT status FROM requests where status='${status}' and createdAt = CURDATE( );`
    db.connection.query(SQL, (err, result) => {
        if (err) {
            console.log(result)
        } else {
            return result
        }
    })
}

exports.status = status
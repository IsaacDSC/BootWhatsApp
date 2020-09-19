require('module-alias/register')
const db = require('@database/configSQL');

async function idUser(user) {
    let sql = `SELECT id FROM users where telephone = '${user}';`
    await db.connection.query(sql, (err, UserId) => {
        if (err) {
            throw err
        } else {
            console.log(`\n\n IdUser: ${UserId[0].id}\n\n`)
        }
    })
}

exports.idUser = idUser
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'db4free.net',
    port: '3306',
    user: 'matheusmlol',
    password: '12052000a',
    database: 'bootwhatsapp'
})

  /* 
module.exports = {
    dialect: 'mysql',
    host: 'db4free.net',
    username: 'matheusmlol',
    password: '12052000a',
    database: 'bootwhatsapp'
}*/

let sql = 'select users.name, users.telephone, menu_requests.delivery from users of menu_requests on users.id = menu_requests.MenuNameId;'
connection.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
})
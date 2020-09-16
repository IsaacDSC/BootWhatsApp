const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'dev',
    password: 'secret',
    database: 'bootwhatsapp'
})


module.exports = connection
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'dev',
    password: 'secret',
    database: 'bootwhatsapp'
})

exports.connection = connection
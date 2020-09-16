const db = require('../src/database/configSQL')


let sql = 'SELECT menus.name, menu_requests.formPayment,users.name FROM menus INNER JOIN menu_requests ON menus.id = menu_requests.MenuNameId INNER JOIN users ON users.id = menu_requests.UserId;'
db.connection.query(sql, (err, result) => {
    console.log(result)
})
const db = require('../src/database/configSQL')


let sql = 'SELECT users.telephone,menu_requests.quantity, menus.name, menu_requests.formPayment,users.name FROM menus INNER JOIN menu_requests ON menus.id = menu_requests.MenuNameId INNER JOIN users ON users.id = menu_requests.UserId;'
db.connection.query(sql, (err, results) => {
    for(result of results){
        console.log(result)
    }
  
})
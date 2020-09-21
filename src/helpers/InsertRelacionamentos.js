require('module-alias/register')
const db = require('@database/configSQL');
const escolha = require("@data/escolha");

async function insert(user) {
    escolha.db[user].itens.forEach((result, index, element) => {
        let sql = `INSERT INTO relacionamentos (UserId, MenuId, PedidosId) VALUES ('${escolha.db[user].id}','${escolha.db[user].itens.id}','${escolha.db[user].id}' ,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);`
        const query = db.connection.query(sql)
        query.on('result', (row) => {
            console.log(row)
        })
        console.log(`${index} - ${result}`)
        console.log(element)
    });
}



exports.insert = insert
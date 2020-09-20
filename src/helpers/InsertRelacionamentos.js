require('module-alias/register')
const db = require('@database/configSQL');
const escolha = require("@data/escolha");

async function insert(UserId, MenuId, PedidosId) {
    let sql = `INSERT INTO relacionamentos (UserId, MenuId, PedidosId) VALUES ('${escolha.db[user].}','${}','${}', ,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`
}

exports.insert = insert
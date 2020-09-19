require('module-alias/register')
const db = require('@database/configSQL');
const escolha = require("@data/escolha");


async function submit(user) {
    let sql = `SELECT id FROM users where telephone = '${user}';`
    await db.connection.query(sql, (err, UserId) => {
        if (err) {
            throw err
        } else {
            console.log(`\n\n IdUser: ${UserId[0].id}\n\n`)
            escolha.db[user].itens.forEach(e => {
                let SQL = `INSERT INTO requests (IdUsuario,quantity, note, delivery, formPayment, profit, spent, status,createdAt,updatedAt) VALUES ('${UserId[0].id}','${Number(escolha.db[user].quantidadeDeProdutos)}','${escolha.db[user].observacao}', '${1.99}', '${escolha.db[user].formaPagamento}', '${Number(e.itens.profit)}','${Number(e.itens.spent)}','${'Preparando'}',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);`
                db.connection.query(SQL, (err, result) => {
                    if (err) {
                        throw err
                    } else {
                        console.log(err)
                        console.log(`Cadastrado com sucesso!\n${result}\n\n Amem`)
                    }
                })

            })
        }
    })

}

exports.submit = submit
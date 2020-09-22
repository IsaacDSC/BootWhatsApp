require('module-alias/register')
const db = require('@database/configSQL');
const escolha = require("@data/escolha");


async function submit(user) {
    console.log(escolha.db[user])
    let sql = `SELECT id FROM users where telephone = '${user}';`
    let sql_adress = `UPDATE users SET address = '${escolha.db[user].endereco}' WHERE telephone = '${user}';`
        //let sql_relacionamentos = `ISERT INTO relacionamentos (UserId,MenuId,PedidosId,createdAt, updateAt) VALUES ('${UserId[0].id}','${escolha.db[user].itens.id}','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),`
    await db.connection.query(sql_adress, (err, resultado) => {
        if (err) {
            throw err
        } else {
            console.log('\n\n endereço cadastrado com sucesso!\n\n')
        }
    })


    await db.connection.query(sql, (err, UserId) => {
        if (err) {
            throw err
        } else {
            console.log(`\n\n IdUser: ${UserId[0].id}\n\n`)
            escolha.db[user].itens.forEach(e => {
                let SQL = `INSERT INTO requests (IdUsuario,quantity, note, delivery, formPayment, profit, spent, status,deliveryType,createdAt,updatedAt) VALUES ('${UserId[0].id}','${Number(e.quantity)}','${escolha.db[user].observacao}', '${1.99}', '${escolha.db[user].formaPagamento}', '${Number(e.profit)}','${Number(e.spent)}','${'Pendente'}',${escolha.db[user].dadosEntrega},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP); `
                db.connection.query(SQL, (err, result) => {
                    if (err) {
                        throw err
                    
                    } else {
                        //idRequest=result.insertId
                        //id menu = e.id
                        //user id = UserId[0].id 
                    let insert_SQL = `INSERT INTO relacionamentos (UserId,MenuId, PedidosId,createdAt,updatedAt) VALUES (${UserId[0].id},${e.id},${result.insertId},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);`
                        db.connection.query(insert_SQL, (err, result) => {
                            if(err){
                                throw err
                            }
                            else{

                                console.log('Inserido com sucesso na tabela relacionamento')
                            }
                          
                        })


                    }
                })

            })
        }
    })

}

exports.submit = submit
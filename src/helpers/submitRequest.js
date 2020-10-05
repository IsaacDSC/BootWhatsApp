require('module-alias/register')
const db = require('@database/configSQL');
const escolha = require("@data/escolha");


async function submit(user,order) {
    
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


   await  db.connection.query(sql, (err, UserId) => {
        if (err) {
            throw err
        } else {
            console.log(`\n\n IdUser: ${UserId[0].id}\n\n`)
            escolha.db[user].itens.forEach(e => { //adicionei o valor taxa 
                let SQL = `INSERT INTO requests (IdUsuario,orderRequest,quantity, note,trocoPara, delivery, formPayment, profit, spent, status,deliveryType,createdAt,updatedAt) VALUES ('${UserId[0].id}','${order}','${Number(e.quantity)}','${escolha.db[user].observacao}','${escolha.db[user].trocoPara}', '${escolha.db[user].valorTaxa}', '${escolha.db[user].formaPagamento}', '${Number(e.profit)}','${Number(e.spent)}','${'Pendente'}','${escolha.db[user].dadosEntrega}',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP); `
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
    escolha.db[user] = {}

}

exports.submit = submit
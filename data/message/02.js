require('module-alias/register')
    //const cardapio = require('@data/cardapio/cardapio')
const banco = require('@data/user/user')

function execute(user, msg) {
    if (msg === '*') {
        banco.db[user].stage = 0
        return ["Pedido Cancelado com Sucesso!"]
    }
    if (msg === "#") {
        banco.db[user].stage = 3
        return ["Digite seu Endenreço para entrega por favor"]
    }

    let resumo = "*Resumo*\n"
    let total = 0
    banco.db[user].itens.forEach((value) => {
        total += value.valor
        resumo += `${value.nome} ...............${value.valor}\n`
        resumo += `Total R$ ${total}`

    })
    return [resumo, "Para confirmar digite # ou para cancelar digite *"]
}


exports.execute = execute
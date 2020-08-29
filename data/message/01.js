require('module-alias/register')
const cardapio = require('@data/cardapio/cardapio')
const banco = require('@data/user/user')

function execute(user, msg) {
    let menu = "*Cardapio*\n\n"
    Object.keys(cardapio.menu).forEach((value) => {
        let element = cardapio.menu[value]
        menu += `${value} - ${element.nome} Valor: R$ ${element.valor} \n`
    })
    if (msg === '*') {
        banco.db[user].stage = 0
        return ["Pedido Cancelado com Sucesso!"]
    }
    if (msg === "#") {
        banco.db[user].stage = 2
        return ["Estamos Finalizando seu pedido, ok?"]
    }
    if (!cardapio.menu[msg]) {
        return ["Codigo invalido.\nDigite um código valido por favor!", "```Digite # para Finalizar ou * para Cancelar```"]
    }


    banco.db[user].itens.push(cardapio.menu[msg])
    return [menu, `Item: (${cardapio.menu[msg].nome}) adionando com sucesso!`, "```Digite # para Finalizar ou * para Cancelar```"]

}


exports.execute = execute
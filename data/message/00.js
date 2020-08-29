require('module-alias/register')
const cardapio = require('@data/cardapio/cardapio')
const banco = require('@data/user/user')

function execute(user, msg) {
    let menu = "*Cardapio*\n\n"
    Object.keys(cardapio.menu).forEach((value) => {
        let element = cardapio.menu[value]
        menu += `${value} - ${element.nome} Valor: R$ ${element.valor} \n`
    })

    banco.db[user].stage = 1

    return ["Olá Sou a Amanda sua assistente virtual. \nIrei apresentar o Cadrdapio basta enviar o código do produto para escolher", menu]
}

exports.execute = execute
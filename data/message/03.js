require('module-alias/register')
const stages = require("@data/stages")
const banco = require('@data/user/user')

function execute(user, msg) {
    if (msg === '*') {
        banco.db[user].stage = 2
        return ["Vamos tentar novamente, Digite corretamente o endereço que você deseja receber o pedido"]
    }
    if (msg === "#") {
        banco.db[user].stage = 4
        return stages.step[4].obj.execute(user, '')
    }

    return [`confime o endereço de entrega\n ${msg}`, "```Digite # para Finalizar ou * para Voltar```"]

}


exports.execute = execute
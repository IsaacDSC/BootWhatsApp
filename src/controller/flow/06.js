require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");

async function execute(user, msg) {

    if (msg.toUpperCase() == 'V') {
        banco.db[user].stage = 5;
        return ["👏  *Está quase no final.*\nVamos definir os dados de entrega e o pagamento.", ' 🔢  Como deseja receber o pedido:\n\n*[ 1 ]* ENTREGAR NO ENDEREÇO\n*[ 2 ]* RETIRAR NO BALCAO\n*[ 3 ]* COMER AQUI NO LOCAL\n*[ 4 ]* AGENDAR A RETIRADA\n\n───────────────\n*[ V ]* MENU ANTERIOR'];
    }
    //endereço muito pequeno trata o endereço
    if (msg.length < 10) {
        return ['*O endereço está muito curto.*\nPreciso que digite *endereço* completo, com número e ponto de referência.\n\n───────────────\n*[ V ]* MENU ANTERIOR']
    }

    escolha.db[user].endereco = msg
    banco.db[user].stage = 7;
    return ['🏠  É para entregar no endereço abaixo?\n\n' + msg.toUpperCase() + '\n\n───────────────\n*[ 1 ]* CONFIRMAR ENDEREÇO 👈\n*[ 2 ]* ALTERAR O ENDEREÇO']


}


module.exports = {
    execute: execute
}
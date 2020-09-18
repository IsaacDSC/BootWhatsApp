require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");

let quantidadeBairros = 2

async function execute(user, msg, contato) {
    valorTotalComTaxa = 5

    await escolha.db[user].itens.forEach(e => {
        valorTotalComTaxa += e.itens.price * e.quantity
    })

    if (msg > quantidadeBairros || !Number(msg)) {
        return ["Você *precisa* escolher um número de bairro."]
    } else {
        banco.db[user].stage = 9
        return ['Como você deseja *pagar*?\nValor total com taxa de entrega: *' + formataReal.dinheiroReal(valorTotalComTaxa) + '*\n\n*[ 1 ]*  DINHEIRO\n*[ 2 ]*  CARTAO DE CREDITO\n*[ 3 ]*  CARTAO DE DEBITO\n\n───────────────']
    }


}


module.exports = {
    execute: execute
}
require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");

let quantidadeBairros = 2

async function execute(user, msg) {
    //Coloar o valor da taxa 
    escolha.db[user].valorTaxa = 5 
    escolha.db[user].valorTotal = 0 + escolha.db[user].valorTaxa

    await escolha.db[user].itens.forEach(e => {
        escolha.db[user].valorTotal += e.itens.price * e.quantity
    })

    if (msg > quantidadeBairros || !Number(msg)) {
        return ["Você *precisa* escolher um número de bairro."]
    } else {
        banco.db[user].stage = 9
        return ['Como você deseja *pagar*?\nValor total com taxa de entrega: *' + formataReal.dinheiroReal(escolha.db[user].valorTotal) + '*\n\n*[ 1 ]*  DINHEIRO\n*[ 2 ]*  CARTAO DE CREDITO\n*[ 3 ]*  CARTAO DE DEBITO\n\n───────────────']
    }


}


module.exports = {
    execute: execute
}
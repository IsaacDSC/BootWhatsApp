require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");
const formataReal = require('@helpers/formataReal')


async function execute(user, msg) {
    let quantidadeBairros = await escolha.db[user].escolha[0].qtdBairros

    console.log(escolha.db[user].escolha)
        //seta o escolha
        //Coloar o valor da taxa 

    await escolha.db[user].itens.forEach(e => {
        escolha.db[user].valorTotal += e.itens.price * e.quantity
    })

    if (msg > quantidadeBairros || !Number(msg)) {
        return ["Você *precisa* escolher um número de bairro."]
    } else {

        const valorTaxa = await escolha.db[user].escolha.filter(e => { return e.idBairro == msg })

        escolha.db[user].valorTaxa = valorTaxa[0].custo
        escolha.db[user].valorTotal = 0 + escolha.db[user].valorTaxa


        banco.db[user].stage = 9
        return ['Como você deseja *pagar*?\nValor total com taxa de entrega: *' + formataReal.dinheiroReal(escolha.db[user].valorTotal) + '*\n\n*[ 1 ]*  DINHEIRO\n*[ 2 ]*  CARTAO DE CREDITO\n*[ 3 ]*  CARTAO DE DEBITO\n\n───────────────']
    }


}


module.exports = {
    execute: execute
}
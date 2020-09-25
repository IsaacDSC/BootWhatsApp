require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");
const formataReal = require('@helpers/formataReal')
const setStage = require('../../helpers/setStage')


async function execute(user, msg) {
    let quantidadeBairros = await escolha.db[user].escolha[0].qtdBairros

    let valorTotal =0
        //seta o escolha
        //Coloar o valor da taxa 

    await escolha.db[user].itens.forEach(e => {
        valorTotal += e.itens.price * e.quantity
    })

    if (msg > quantidadeBairros || !Number(msg)) {
        return ["Você *precisa* escolher um número de bairro."]
    } else {

        const valorTaxa = await escolha.db[user].escolha.filter(e => { return e.idBairro == msg })
        
        escolha.db[user].valorTaxa = valorTaxa[0].custo
        setStage.envStageDb(user, 9)
        banco.db[user].stage = 9
        return ['Como você deseja *pagar*?\nValor total com taxa de entrega: *' + formataReal.dinheiroReal((valorTaxa[0].custo+valorTotal)) + '*\n\n*[ 1 ]*  DINHEIRO\n*[ 2 ]*  CARTAO DE CREDITO\n*[ 3 ]*  CARTAO DE DEBITO\n\n───────────────']
    }


}


module.exports = {
    execute: execute
}
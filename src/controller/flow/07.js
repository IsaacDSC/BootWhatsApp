require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");
const db = require('@database/configSQL')
const neigborhoods = require('@helpers/getNeighborhoods')
const setStage = require('../../helpers/setStage')

let escolhaBairroAtivo = true

const formataReal = require('@helpers/formataReal')

async function execute(user, msg) {

    //Coloar o valor da taxa 
    let valorTotal =0
        //seta o escolha
        //Coloar o valor da taxa 

    await escolha.db[user].itens.forEach(e => {
        valorTotal += e.itens.price * e.quantity
    })
    await neigborhoods.getBairro(user).then(res => bairros = res.toString())

    // return menu += `*[ ${index+1} ]* ${e.dataValues.class.toUpperCase()} \n`

    if (msg == 1 && escolhaBairroAtivo) {

        banco.db[user].stage = 8
        setStage.envStageDb(user, 8)
        return [bairros]
    }
    if (msg == 1) {
        banco.db[user].stage = 9
        setStage.envStageDb(user, 9)
        return ['Como você deseja *pagar*?\nValor total com taxa de entrega: *' + formataReal.dinheiroReal((escolha.db[user].valorTaxa+valorTotal))  + '*\n\n*[ 1 ]*  DINHEIRO\n*[ 2 ]*  CARTAO DE CREDITO\n*[ 3 ]*  CARTAO DE DEBITO\n\n───────────────']
    }
    if (msg == 2) {
        banco.db[user].stage = 5;
        setStage.envStageDb(user, 5)
        return ["👏  *Está quase no final.*\nVamos definir os dados de entrega e o pagamento.", ' 🔢  Como deseja receber o pedido:\n\n*[ 1 ]* ENTREGAR NO ENDEREÇO\n*[ 2 ]* RETIRAR NO BALCAO\n*[ 3 ]* COMER AQUI NO LOCAL\n*[ 4 ]* AGENDAR A RETIRADA\n\n───────────────\n*[ V ]* MENU ANTERIOR'];
    }

    return ['Opção Invalida']




}


module.exports = {
    execute: execute
}
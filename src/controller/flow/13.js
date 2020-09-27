require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");
const getMenu = require('@helpers/getMenu')
const formataReal = require('@helpers/formataReal')
const setStage = require('../../helpers/setStage')

async function execute(user, msg) {
    let valorTotal=0
    const frase = '🔤  Se desejar, digite alguma *OBSERVAÇÃO PARA O SEU PEDIDO*.\n\n───────────────\n[ N ] NÃO TENHO OBSERVAÇÃO'

    await getMenu.getMenu(user).then((res) => menu = res.toString())

    async function getProdutos() {
        valorTotal=0
        let renderProdutos = ''
        //Cardapio Obtido Do Banco de Dados só Obtem as classes
        await escolha.db[user].itens.forEach((e, i) => {
            valorTotal += e.quantity * e.itens.price
            return renderProdutos += '\n*' + `[ ${i + 1} ] ` + e.class.toUpperCase() + '*\n' + e.itens.name + '\n```' + e.quantity + ' X ' + e.itens.price + '``` = ```' + e.itens.price * e.quantity + '```\n'
        })
        return renderProdutos
    }

    await getProdutos()

    if (escolha.db[user].itens.length == 0) {
        banco.db[user].stage = 1;
        setStage.envStageDb(user, 1)
        return [menu];
    }

    if (msg.toUpperCase() == 'E') {
        banco.db[user].stage = 1;
        setStage.envStageDb(user, 1)
        return [menu];
    }
    if (msg.toUpperCase() == 'F') {
        setStage.envStageDb(user, 11)
        banco.db[user].stage = 11;
        return [frase];
    } 

    if (msg <= escolha.db[user].itens.length && msg > 0) {
        await escolha.db[user].itens.splice(msg - 1, 1)
        await getProdutos().then(res => product = res.toString())


        if(valorTotal>0){
        return ['📝  *ABAIXO O QUE JÁ ESCOLHEU:*\n' + product + '\n*Parcial do pedido ' + formataReal.dinheiroReal(valorTotal) + '*\n\n_Digite o número que é para apagar_\n\n───────────────\n*[ F ]* PARA FECHAR O PEDIDO\n*[ E ]* ESCOLHER OUTRO PRODUTO','👍  Excluído com sucesso.']}
        else{
            banco.db[user].stage = 1;
            setStage.envStageDb(user, 1)
            return [menu];
        }
    
    }


    return ['Você precisa digitar *F* para que eu possa estar finalizando seu pedido.']


}

module.exports = {
    execute: execute
}
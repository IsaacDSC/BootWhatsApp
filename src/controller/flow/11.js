require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");
const formataReal = require('@helpers/formataReal')
const setStage = require('../../helpers/setStage')

async function execute(user, msg, contato) {
    //new
    escolha.db[user].escolha
    let pgm = ''
    let product
    let end = ' '
    let endereco = escolha.db[user].endereco
    let obs = ''
    let valorTotal = 0
    escolha.db[user].observacao = msg
    banco.db[user].stage = 12
    setStage.envStageDb(user, 12)
    if (msg.toUpperCase() != 'N') {
        obs = '\nObs:' + escolha.db[user].observacao
    }
    if (endereco) {
        end = '\n' + endereco
    }
    if (escolha.db[user].formaPagamento) {
        pgm = '*Pagamento:* ' + escolha.db[user].formaPagamento + '\n'
    }


    async function getProdutos() {
        let renderProdutos = ''
            //Cardapio Obtido Do Banco de Dados só Obtem as classes
        await escolha.db[user].itens.forEach((e) => {
            valorTotal += e.quantity * e.itens.price
            return renderProdutos += '\n*' + e.class.toUpperCase() + '*\n' + e.itens.name + '\n```' + e.quantity + ' X ' + e.itens.price + '``` = ```' + e.itens.price * e.quantity + '```\n'
        })
        return renderProdutos
    }
    await getProdutos().then(res => product = res.toString())

    return [ '*Etapa final.*\n\n*[ OK ] PARA CONFIRMAR O PEDIDO*\n*[ C ]* PARA CORRIGIR O PEDIDO','' + escolha.db[user].nome + '\n' + escolha.db[user].dadosEntrega + '' + end + obs + '\n\n*[ PRODUTOS ]*\n' + product + '\n' + pgm + '*Total produto:* ' + formataReal.dinheiroReal(valorTotal) + '\nTaxa entrega: ' + formataReal.dinheiroReal((escolha.db[user].valorTaxa?escolha.db[user].valorTaxa:0)) + '\n*Total do pedido: ' + formataReal.dinheiroReal((valorTotal + escolha.db[user].valorTaxa)) + '*\n\nTel: ' + contato + ' WHATSAPP\nSeq: 2 | 14/09/2020 16:26\nStatus: Cliente novo']

}

module.exports = {
    execute: execute
}
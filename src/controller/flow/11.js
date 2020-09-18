require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");



async function execute(user, msg, contato) {

    return ['Fim Do Pedido']
    let end = ''
    let obs = ''
        //pagamento
    let pgm = ''
    let product
    escolha.db[user].observacao = msg
    if (msg.toUpperCase() != 'N') {
        obs = '\n' + escolha.db[user].observacao
    }
    if (escolha.db[user].endereco) {
        end = '\n' + escolha.db[user].endereco
    }
    if (escolha.db[user].formaPagamento) {
        pgm = '*Pagamento:*' + escolha.db[user].formaPagamento + '\n'
    }

    async function getProdutos() {
        let renderProdutos = ''
            //Cardapio Obtido Do Banco de Dados só Obtem as classes
        await escolha.db[user].itens.forEach((e) => {
            return renderProdutos += '\n*' + e.class.toUpperCase() + '*\n' + e.itens.name + '\n```' + e.quantity + ' X ' + e.itens.price + '``` = ```' + e.itens.price * e.quantity + '```\n'
        })
        return renderProdutos
    }
    await getProdutos().then(res => product = res.toString())

    return ['' + escolha.db[user].nome + '\n' + escolha.db[user].dadosEntrega + '' + end + obs + '\n\n*[ PRODUTOS ]*\n' + product + '\n' + pgm + '*Total produto:* ' + formataReal.dinheiroReal(1) + '\nTaxa entrega: R$ 0,00\n*Total do pedido: ' + formataReal.dinheiroReal(1) + '*\n\nTel: ' + contato + ' WHATSAPP\nSeq: 2 | 14/09/2020 16:26\nStatus: Cliente novo', '*Etapa final.*\n\n*[ OK ] PARA CONFIRMAR O PEDIDO*\n*[ C ]* PARA CORRIGIR O PEDIDO']



}




module.exports = {
    execute: execute
}
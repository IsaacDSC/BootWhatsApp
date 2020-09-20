require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");



async function execute(user, msg, contato) {

    const frase = '🔤  Se desejar, digite alguma *OBSERVAÇÃO PARA O SEU PEDIDO*.\n\n───────────────\n[ N ] NÃO TENHO OBSERVAÇÃO'

    //Coloar o valor da taxa 
    escolha.db[user].valorTotal = 0 + escolha.db[user].valorTaxa

    await escolha.db[user].itens.forEach(e => {
        escolha.db[user].valorTotal += e.itens.price * e.quantity
    })

    if (msg == '1') {
        escolha.db[user].formaPagamento = 'DINHEIRO'
        banco.db[user].stage = 10
        return ['Valor total com a taxa de entrega: ' + escolha.db[user].valorTotal + ' 💰 ' + '\n\nPrecisa de troco para quanto?\nPor exemplo: troco para 50\n\n*[ N ]* NÃO PRECISA DE TROCO']
    }

    if (msg == '2') {
        escolha.db[user].formaPagamento = 'CARTAO DE CREDITO'
        banco.db[user].stage = 11
        return [frase]
    }
    if (msg == '3') {
        escolha.db[user].formaPagamento = 'CARTAO DE DEBITO'
        banco.db[user].stage = 11

        return [frase]
    }
    return ['Opção De Pagamento Invalida']


}


module.exports = {
    execute: execute
}
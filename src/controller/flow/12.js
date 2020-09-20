require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");
const enviaParaFrontend = require('../../server');
const SubmitRequest = require('@helpers/submitRequest')
const formataReal = require('@helpers/formataReal')

let valorTotal = 0

async function execute(user, msg, contato) {

    if (msg.toUpperCase() == 'OK') {

        await enviaParaFrontend.enviaParaFrontend({
            name: contato,
            telephone: user,
            taxa: escolha.db[user].valorTaxa,
            OrderTime: new Date().toTimeString(),
            Address: escolha.db[user].endereco,
            formaPagamento: escolha.db[user].formaPagamento,
            request: escolha.db[user].itens,
            observacao: escolha.db[user].observacao,
            trocoPara: escolha.db[user].trocoPara,
            dadosEntrega: escolha.db[user].dadosEntrega
        })

        await SubmitRequest.submit(user) //chama a função e envia os dados para a table request
            //seta o escolha

        return ['✅  Seu pedido foi *realizado*.\n\nObrigado por realizar seu pedido.\n\n```Desenvolvido por Matheus & IsaacDSC```']

    }
    if (msg.toUpperCase() == 'C') {
        //falta terminar
        banco.db[user].stage = 13


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


        return ['📝  *ABAIXO O QUE JÁ ESCOLHEU:*\n\n*[ 1 ] LANCHES*\n```COMBO LANCHE + BEBIDA```\n```5 X 23,00``` = ```115,00```\n\n*Parcial do pedido '+formataReal.dinheiroReal(valorTotal)+'*\n\n_Digite o número que é para apagar_\n\n───────────────\n*[ F ]* PARA FECHAR O PEDIDO\n*[ E ]* ESCOLHER OUTRO PRODUTO']
    }

    return ['Você precisa digitar *OK* para que eu possa preparar seu pedido.']



}

module.exports = {
    execute: execute
}
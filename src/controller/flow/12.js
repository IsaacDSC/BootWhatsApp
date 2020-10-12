require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");
const enviaParaFrontend = require('../../server');
const SubmitRequest = require('@helpers/submitRequest')
const formataReal = require('@helpers/formataReal')
const getMenu = require('@helpers/getMenu')
const NovoClienteAtendimento = require('../../server');
const setStage = require('../../helpers/setStage')

async function execute(user, msg, contato) {
    let valorTotal = 0
    let order = Math.random().toString(32).substr(2, 9)

    /*await getMenu.getMenu(user).then((res) => menu = res.toString())

    if(escolha.db[user].itens.length==0){
        banco.db[user].stage = 1;
        return [menu];
    } */

    if (msg.toUpperCase() == 'OK') {
        banco.db[user].stage = 0
        setStage.envStageDb(user, 0)
        
        NovoClienteAtendimento.NovoClienteAtendimento({soma: -1})
        await enviaParaFrontend.enviaParaFrontend({
            name: contato,
            order,
            telephone: user,
            taxa: escolha.db[user].valorTaxa,
            OrderTime: new Date().toTimeString(),
            bairro:escolha.db[user].bairro,
            Address: escolha.db[user].endereco,
            formaPagamento: escolha.db[user].formaPagamento,
            request: escolha.db[user].itens,
            observacao: escolha.db[user].observacao,
            trocoPara: escolha.db[user].trocoPara,
            dadosEntrega: escolha.db[user].dadosEntrega
        })

      await SubmitRequest.submit(user,order) //chama a função e envia os dados para a table request
            //seta o escolha
        return ['✅  Seu pedido foi *realizado*.\n\nObrigado por realizar seu pedido.',]

    }
    if (msg.toUpperCase() == 'C') {
   
        banco.db[user].stage = 13
        setStage.envStageDb(user, 13)

        async function getProdutos() {
            let renderProdutos = ''
                //Cardapio Obtido Do Banco de Dados só Obtem as classes
            await escolha.db[user].itens.forEach((e,i) => {
                valorTotal += e.quantity * e.itens.price
                return renderProdutos += '\n*'+`[ ${i+1} ] ` + e.class.toUpperCase() + '*\n' + e.itens.name + '\n```' + e.quantity + ' X ' + e.itens.price + '``` = ```' + e.itens.price * e.quantity + '```\n'
            })
            return renderProdutos
        }
        await getProdutos().then(res => product = res.toString())

        return ['📝  *ABAIXO O QUE JÁ ESCOLHEU:*\n'+product+'\n*Parcial do pedido '+formataReal.dinheiroReal(valorTotal)+'*\n\n_Digite o número que é para apagar_\n\n───────────────\n*[ F ]* PARA FECHAR O PEDIDO\n*[ E ]* ESCOLHER OUTRO PRODUTO']
    }

    return ['Você precisa digitar *OK* para que eu possa preparar seu pedido.']



}

module.exports = {
    execute: execute
}
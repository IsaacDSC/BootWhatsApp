require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");
const enviaParaFrontend = require('../../server');
const db = require('@database/configSQL');
const User = require('@/models/Users');
const getIdUser = require('@helpers/pegarIdUser')
const SubmitRequest = require('@helpers/submitRequest')

async function execute(user, msg, contato) {

    if (msg.toUpperCase() == 'OK') {
        //chama função para pegar id do telefone vindo como parametro de user
        await SubmitRequest.submit(user) //chama a função e envia os dados para a table request




        /* await db.connection.query(sql, (err, UserId) => {
             if (err) {
                 throw err
             } else {
                 mandaParaBd()

                 console.log(`\n\n${UserId[0].id}\n\n`)
                 async function mandaParaBd() {
                     await escolha.db[user].itens.forEach(e => {
                         let SQL_request = `INSERT INTO requests 
                         (quantity, note, delivery, formPayment, profit, spent, status)
                         VALUES 
                         (${Number(e.quantity)},
                         ${escolha.db[user].observacao}, ${escolha.db[user].endereco}, ${escolha.db[user].formaPagamento},
                         ${Number(e.profit)},${Number(e.spent)}, 'Preparo');`
                         db.connection.query(SQL_request, (err, result) => {
                             if (err) {
                                 throw err
                             } else {
                                 console.log(`\n\n Cadastrado com sucesso \n\n${result}\n\n`)
                             }

                         })
                     })
                 }
             }

         }) */





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

        //seta o escolha
        //  escolha.db[user] = {}

        return ['✅  Seu pedido foi *realizado*.\n\nObrigado por realizar seu pedido.\n\n```Desenvolvido por Matheus & IsaacDSC```']

    }
    if (msg.toUpperCase() == 'C') {
        //falta terminar
        banco.db[user].stage = 13
        return ['📝  *ABAIXO O QUE JÁ ESCOLHEU:*\n\n*[ 1 ] LANCHES*\n```COMBO LANCHE + BEBIDA```\n```5 X 23,00``` = ```115,00```\n\n*Parcial do pedido R$ 115,00*\n\n_Digite o número que é para apagar_\n\n───────────────\n*[ F ]* PARA FECHAR O PEDIDO\n*[ E ]* ESCOLHER OUTRO PRODUTO']
    }

    return ['Você precisa digitar *OK* para que eu possa preparar seu pedido.']



}

module.exports = {
    execute: execute
}
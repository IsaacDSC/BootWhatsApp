require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");
const enviaParaFrontend = require('../../server');
const db = require('@database/configSQL');

async function execute(user, msg, contato) {

    if (msg.toUpperCase() == 'OK') {

        let sql = `SELECT id FROM users where telephone = ${user};`
        await db.connection.query(sql, (err, UserId) => {

            escolha.db[user].itens.foreach(e => {
                let SQL = `INSERT INTO menu_requests 
                (MenuNameId, UserId, quantity, note, delivery, formPayment, profit, spent, status)
                 VALUES 
                 (${escolha.db[user].idItem}, ${UserId[0].id}, ${escolha.db[user].quantidadeDeProdutos},
                 ${escolha.db[user].observacao}, ${escolha.db[user].endereco}, ${escolha.db[user].formaPagamento},
                 ${e.itens.profit},${e.itens.spent}, 'Preparo');`
                db.connection.query(SQL, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('\n\ncadastrado com sucesso\n\n' + result)
                    }
                })

            })



        })

        //await dados.request.forEach(e => total += e.quantity * e.itens.price)




        /*
        escolha: [],
            itens: [],
            nome: '',
            valorTaxa:'',
            itensEscolhido: '',
            quantidaDeProdutos: '',
            productionCost: '',
            classeDoProduto: '',
            idItem: '',
            dadosEntrega: '',
            endereco: '',
            formaPagamento: '',
            trocoPara: '',
            observacao:'',
            valorTotal: 0

        */










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
        escolha.db[user] = {}

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
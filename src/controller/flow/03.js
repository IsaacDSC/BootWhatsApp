require('module-alias/register')
const stages = require("@controller/controller")
const banco = require('@data/user/user')
const User = require('@models/Users')
const setStage = require('@helpers/setStage')
const escolha = require('@data/escolha')
const Menu = require('@models/Menu')
const config = require('@helpers/config')

async function execute(user, msg) {
    let nameItens = escolha.db[user].itensEscolhido.name
    let classeDoProduto = escolha.db[user].classeDoProduto
    let idItem = escolha.db[user].idItem
    let price = escolha.db[user].itensEscolhido.price
    let productionCost = escolha.db[user].productionCost

    await config.configMaxCompra().then(res=>quantidadeItens= res)

    console.log(quantidadeItens+'Quantidade de itens')
    if (msg > Number(quantidadeItens)) {
        return [`🔢  Quantidade muito alta.\nLimite máximo por pedido ${quantidadeItens} unidades.`]
    }
    if (!Number(msg)) {
        return [`🔢  Por Favor digte a Quantidade.\nLimite máximo por pedido ${quantidadeItens} unidades.`]
    } else { //esta no stage01        
        //enviando para Itens
        banco.db[user].stage = 4;
        setStage.envStageDb(user, 4)
        escolha.db[user].escolha= []
        let itens = { name: nameItens, price: price }
        escolha.db[user].itens.push({ itens, quantity: msg, class: classeDoProduto, id: idItem, profit: (price * msg) - (productionCost * msg), spent: productionCost * msg })
            //e.index == banco.db[user].msgItem

        //Coloca o Item escolhido do usuario ao banco de dados 
        return ['Deseja escolher *outro* produto?\n\n───────────────\n\n*[ E ]* ESCOLHER OUTRO PRODUTO\n*[ M ]* ESCOLHER MAIS *' + escolha.db[user].classeDoProduto.toUpperCase() + '*\n\n*[ F ]* *PARA FECHAR O PEDIDO*',`👏  Produto *gravado* no carrinho.`]

    }
}

exports.execute = execute;
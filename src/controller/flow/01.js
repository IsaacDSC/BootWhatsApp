require('module-alias/register')
const escolha = require("@data/escolha"); //arquivo com diretorio errado tbm tirar dependencia e excluir
//models do banco de dados
const Menu = require('@models/Menu')
const banco = require('@data/user/user') //configuração que fica ate o final armazenando usuarios que o boot responderá e armazenando os itens para Total da compra
    //arquivos que devem estar em pastas controllers porem se encontram em helpers ainda
const setStage = require('@helpers/setStage')
const getMenu = require('@helpers/getMenu')
let idItem
let key = 0;
//usada para voltar ao menu 
let price
let voltaMenu =' '
let productionCost
let msgItem
let msgItemMais
let quantidaDeProdutos
let itensEscolhido
let classeDoProduto
async function execute(user, msg) {
    let menu //armazena os cardapios provindos do banco de dados
    await getMenu.getMenu(user).then((res) => menu = res.toString())

    const quantidadedeEscolhas = await Menu.findAll({
        attributes: ['class'],
        group: ['class']
    })

    if(key==0 && voltaMenu.toUpperCase() =='V'){
        escolha.db[user].escolha = []
        key = 0
        return [menu];
    }
    //quantidade de classes verifica se o estagio 0 passou corretamente
    if(key==0 && msg>quantidadedeEscolhas.length || !Number(msg) && key == 0){
        return["Você *precisa* escolher um número da categoria."]
    }

    if(key==0){
        key = 1
        msgItemMais = msg
            // Numero Digitado pega a class
        const classe = quantidadedeEscolhas[msg - 1].dataValues.class
        classeDoProduto= classe
        const itensMenu = await Menu.findAll({ where: { class: classe } })
        let message = '🔢 Digite o *número* do produto:\n\n ```Digite apenas 1 número.```\n\n'
        
       itensMenu.forEach((e, index) => {
                quantidaDeProdutos = index+1
                escolha.db[user].escolha.push({ 'index': index + 1, 'name': e.dataValues.name, 'price': e.dataValues.value })

                return message += `*[ ${index + 1} ]* ${e.dataValues.name.toUpperCase()}- _${e.dataValues.value}_ \n`;
            })
            //parte final da String
        message += "\n───────────────\n*[ V ]* MENU ANTERIOR"
        return [message];
    }
    if(key==1 && msg.toUpperCase()=="V"){
        escolha.db[user].escolha = []
        key = 0
        return [menu];
    }
    //quantidade de itens Produto
    if(key==1 &&msg>quantidaDeProdutos){
        return["Você *precisa* escolher um número de produto."]
    }
    if (key === 1) {
        msgItem = msg
        const itemEscolhido = await escolha.db[user].escolha.filter(e => { return e.index == msgItem })
        
        await Menu.findOne({where:{name: itemEscolhido[0].name}}).then(res=>{idItem=res.dataValues.id; productionCost=res.dataValues.costProduce})
        
        price = itemEscolhido[0].price
        itensEscolhido= {name: itemEscolhido[0].name,price: itemEscolhido[0].price}
        key = 2
        return ['🔢  Quantos produtos *' + itemEscolhido[0].name + '* iguais a este você quer pedir?\n\n *Digite um número para gravar este produto.*']
    }
    if (key === 2 && msg >= 100) {
        return ['🔢  Quantidade muito alta.\nLimite máximo por pedido 100 unidades.']
    }
    if(key==2 && !Number(msg)){
        return ['🔢  Por Favor digite a Quantidade.\nLimite máximo por pedido 100 unidades.']
    }
    if (key == 2) { //esta no stage01
        key = 3 //levar para arquivo 03.js

        escolha.db[user].itens.push({itensEscolhido,quantity:msg,class:classeDoProduto,id:idItem, profit: (price* msg) - (productionCost* msg) ,spent:productionCost*msg})
        const itemEscolhido = await escolha.db[user].escolha.filter(e => { return e.index == msgItem })
        const MenuNameId = await Menu.findAll({ where: { name: itemEscolhido[0].name }, attributes: ['id', 'class'] })
        escolha.db[user].escolha = []
        //Coloca o Item escolhido do usuario ao banco de dados 
        return [`👏  Produto *gravado* no carrinho.`, 'Deseja escolher *outro* produto?\n\n───────────────\n\n*[ E ]* ESCOLHER OUTRO PRODUTO\n*[ M ]* ESCOLHER MAIS *' + MenuNameId[0].dataValues.class.toUpperCase() + '*\n\n*[ F ]* *PARA FECHAR O PEDIDO*']

    }
    if(key==3 && msg.toUpperCase()=='E'){
        escolha.db[user].escolha = []
        key = 0
        return [menu];
    }
    if(key==3 && msg.toUpperCase()=='M'){
        key = 1
        voltaMenu = msg
        const classe = quantidadedeEscolhas[msgItemMais - 1].dataValues.class
        classeDoProduto= classe
        const itensMenu = await Menu.findAll({ where: { class: classe } })
    
        let message = '🔢 Digite o *número* do produto:\n\n ```Digite apenas 1 número.```\n\n'
        
        itensMenu.forEach((e, index) => {
                escolha.db[user].escolha.push({ 'index': index + 1, 'name': e.dataValues.name, 'price': e.dataValues.value })

                return message += `*[ ${index + 1} ]* ${e.dataValues.name.toUpperCase()}- _${e.dataValues.value}_ \n`;
            })
            //parte final da String
        message += "\n───────────────\n*[ V ]* MENU ANTERIOR"
        return [message];
    } 
      //Carrega as opçoes de envio do pedido
    if(key==3 && msg.toUpperCase()=='F'){
        setStage.envStageDb(user, 2)
        key = 0
        banco.db[user].stage = 2;
        return ["👏  *Está quase no final.*\nVamos definir os dados de entrega e o pagamento.", ' 🔢  Como deseja receber o pedido:\n\n*[ 1 ]* ENTREGAR NO ENDEREÇO\n*[ 2 ]* RETIRAR NO BALCAO\n*[ 3 ]* COMER AQUI NO LOCAL\n*[ 4 ]* AGENDAR A RETIRADA\n\n───────────────\n*[ V ]* MENU ANTERIOR'];

    }
    if(key == 3){
        return['Opção Invalida']
    }  
}

exports.execute = execute;
require('module-alias/register')
const escolha = require("@data/escolha"); //arquivo com diretorio errado tbm tirar dependencia e excluir
//models do banco de dados
const Menu = require('@models/Menu')
const banco = require('@data/user/user') //configuração que fica ate o final armazenando usuarios que o boot responderá e armazenando os itens para Total da compra
    //arquivos que devem estar em pastas controllers porem se encontram em helpers ainda
const setStage = require('@helpers/setStage')
const getMenu = require('@helpers/getMenu')
const flowOne = require('@controller/flow/01')

async function execute(user, msg) {

    console.log(escolha.db[user])

    await getMenu.getMenu(user).then((res) => menu = res.toString())

    //Esse redireciona para o arquivo 01
    if (msg.toUpperCase() == 'V') {
        banco.db[user].stage = 1;
        setStage.envStageDb(user, 1)
        escolha.db[user].escolha = []
        return [menu];
    }
    if (msg > escolha.db[user].quantidaDeProdutos || !Number(msg)) {
        return ["Você *precisa* escolher um número de produto."]
    } else {

        escolha.db[user].msgItem = Number(msg)
        setStage.envStageDb(user, 3)
        banco.db[user].stage = 3;
        const itemEscolhido = await escolha.db[user].escolha.filter(e => { return e.index == escolha.db[user].msgItem })
        console.log(itemEscolhido)
        await Menu.findOne({ where: { name: itemEscolhido[0].name } }).then(res => {
            escolha.db[user].idItem = res.dataValues.id;
            escolha.db[user].productionCost = res.dataValues.costProduce
        })

        escolha.db[user].itensEscolhido = { name: itemEscolhido[0].name, price: itemEscolhido[0].price }
        console.log(escolha.db[user].msgItem)
        return ['🔢  Quantos produtos *' + itemEscolhido[0].name + '* iguais a este você quer pedir?\n\n *Digite um número para gravar este produto.*']
    }




}


module.exports = {
    execute: execute,

}
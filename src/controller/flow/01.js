require('module-alias/register')
const escolha = require("@data/escolha"); //arquivo com diretorio errado tbm tirar dependencia e excluir
//models do banco de dados
const Menu = require('@models/Menu')
const banco = require('@data/user/user') //configuração que fica ate o final armazenando usuarios que o boot responderá e armazenando os itens para Total da compra
//arquivos que devem estar em pastas controllers porem se encontram em helpers ainda
const setStage = require('@helpers/setStage')
const getMenu = require('@helpers/getMenu')
const formataReal = require('@helpers/formataReal')

async function execute(user, msg) {

    await getMenu.getMenu(user).then((res) => menu = res.toString())

    const quantidadedeEscolhas = await Menu.findAll({
        attributes: ['class'],
        group: ['class']
    })
    if (msg.toUpperCase() == 'F' && escolha.db[user].itens.length > 0) {
        banco.db[user].stage = 5;
        setStage.envStageDb(user, 5)
        return ["👏  *Está quase no final.*\nVamos definir os dados de entrega e o pagamento.", ' 🔢  Como deseja receber o pedido:\n\n*[ 1 ]* ENTREGAR NO ENDEREÇO\n*[ 2 ]* RETIRAR NO BALCAO\n*[ 3 ]* COMER AQUI NO LOCAL\n*[ 4 ]* AGENDAR A RETIRADA\n\n───────────────\n*[ V ]* MENU ANTERIOR'];
    }
    //quantidade de classes verifica se o estagio 0 passou corretamente
    if (msg > quantidadedeEscolhas.length || !Number(msg)) {
        return ["Você *precisa* escolher um número da categoria."]
    } else {
        setStage.envStageDb(user, 2)
        banco.db[user].stage = 2;
        banco.db[user].msgItemMais = Number(msg)
        // Numero Digitado pega a class
        const classe = quantidadedeEscolhas[msg - 1].dataValues.class
        escolha.db[user].classeDoProduto = classe
        const itensMenu = await Menu.findAll({ where: { class: classe } })
        console.log(itensMenu + 'Itens Menu')
        let message = '🔢 Digite o *número* do produto:\n\n ```Digite apenas um número.```\n\n'

        itensMenu.forEach((e, index) => {

            escolha.db[user].quantidaDeProdutos = index + 1
            escolha.db[user].escolha.push({ 'index': index + 1, 'name': e.dataValues.name, 'price': e.dataValues.value })
            return message += `*[ ${index + 1} ]* ${e.dataValues.name.toUpperCase()}- _${formataReal.dinheiroReal(e.dataValues.value)}_ \n`;
        })
        //parte final da String
        message += "\n───────────────\n*[ V ]* MENU ANTERIOR"


        return [message];
    }





}


module.exports = {
    execute: execute,
}
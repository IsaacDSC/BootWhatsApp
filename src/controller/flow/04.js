require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require('@data/escolha')
const Menu = require('@models/Menu')
const setStage = require('@helpers/setStage')
const getMenu = require('@helpers/getMenu')

async function execute(user, msg) {
    //armazena os cardapios provindos do banco de dados
    await getMenu.getMenu(user).then((res) => menu = res.toString())

    //banco.db[user].stage = 0;
    if (msg.toUpperCase() == 'E') {
        //escolha.db[user].escolha = []
        setStage.envStageDb(user, 1)
        banco.db[user].stage = 1;
        return [menu];
    }
    if (msg.toUpperCase() == 'M') {
        banco.db[user].stage = 2;
        setStage.envStageDb(user, 2)
        const itensMenu = await Menu.findAll({ where: { class: escolha.db[user].classeDoProduto } })

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
    if (msg.toUpperCase() == 'F') {
        setStage.envStageDb(user, 5)
        setStage.envStageDb(user, 5)
        banco.db[user].stage = 5;
        return [' 🔢  Como deseja receber o pedido:\n\n*[ 1 ]* ENTREGAR NO ENDEREÇO\n*[ 2 ]* RETIRAR NO BALCAO\n*[ 3 ]* COMER AQUI NO LOCAL\n*[ 4 ]* AGENDAR A RETIRADA\n\n───────────────\n*[ V ]* MENU ANTERIOR',"👏  *Está quase no final.*\nVamos definir os dados de entrega e o pagamento."];

    }

    return ['Opção Invalida']

}

exports.execute = execute;
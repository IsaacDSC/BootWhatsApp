require('module-alias/register')
    //const cardapio = require('@data/cardapio/inicio')
const banco = require('@data/user/user')
const Cardapio = require('@models/Menu')
const escolha = require("../escolha");
const setStage = require('../../src/helpers/setStage')

let key = 0

async function execute(user, msg, contato) {
    let menu = '🔢 Digite o *número* da categoria:\n\n ```Digite apenas 1 número.```\n\n';

    //Cardapio Obtido Do Banco de Dados só Obtem as classes
    const cardapio = await Cardapio.findAll({
        attributes: ['class'],
        group: ['class']
    })


    //passa cada primeira letra para maiuscula
    cardapio.forEach((e, index) => {
        escolha.db.push({ 'id': index + 1, 'class': e.dataValues.class })
        return menu += `*[ ${index+1} ]* ${e.dataValues.class.toUpperCase()} \n`
    })

    menu += '\nDica:\nse quer *' + escolha.db[0].class.toUpperCase() + '* envie o número *1*.\n\n───────────────'

    if (key === 1) {
        //Nome da pessoa Digitado = contato

        contato = msg
        banco.db[user].stage = 1;
        //console.log('\n\n' + user + '\n\n')
        // passando user para estagio 01
        setStage.envStageDb(user, 0)


        return [
            `Olá, *${contato}* sou uma assistente virtual, irei apresentar o carpádio, para fazer o pedido basta enviar o codigo do produto`,
            menu,
        ]
    }


    if (contato) {
        //Nome da pessoa já Cadastrada na sua lista de contatos
        banco.db[user].stage = 1;
        //console.log('\n\n' + user + '\n\n')
        // passando user para estagio 01
        setStage.envStageDb(user, 1)

        return [
            `Olá, *${contato}* sou uma assistente virtual, irei apresentar o carpádio, para fazer o pedido basta enviar o codigo do produto`,
            menu,
        ];
    } else {
        setStage.envStageDb(user, 0)

        banco.db[user].stage = 0;
        key = 1
        return ['Olá, Qual seu Nome?']
    }
}

exports.execute = execute;
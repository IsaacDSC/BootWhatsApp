require('module-alias/register')
    //const cardapio = require('@data/cardapio/inicio')
const banco = require('@data/user/user')
const Cardapio = require('@models/Menu')
const User = require('@models/Users')


let key = 0


async function execute(user, msg, contato) {
    let menu = " CARDAPIO \n\n";

    //Cardapio Obtido Do Banco de Dados
    const cardapio = await Cardapio.findAll()
    console.log(cardapio)
    cardapio.forEach(e => menu += `${e.dataValues.id} - ${e.dataValues.name} \n`)


    /*Object.keys(cardapio.menu).forEach((value) => {
      let element = cardapio.menu[value];
      menu += `${value} - ${element.descricao}\n`;
    });*/

    if (key === 1) {
        //Nome da pessoa Digitado = contato

        contato = msg
        banco.db[user].stage = 1;
        // passando user para estagio 01
        const USER = await User.findOne({ where: { telephone: msg.sender.id } })
        try {
            USER((stage) => {
                stage.stage = 1,
                    stage.save()
            }).then(() => {
                console.log('usuario para o proximo estagio salvo')
            })
        } catch (error) {
            console.log('erro ao enviar usuario para o proximo estagio: ' + error)
        }

        return [
            `Olá, ${contato} sou uma assistente virtual, irei apresentar o carpádio, para fazer o pedido basta enviar o codigo do produto`,
            menu,
        ]
    }


    if (contato) {
        //Nome da pessoa já Cadastrada na sua lista de contatos

        banco.db[user].stage = 1;
        // passando user para estagio 01
        const USER = await User.findOne({ where: { telephone: msg.sender.id } })
        try {
            console.log(USER)
            USER((stage) => {
                stage.stage = 1,
                    stage.save()
            }).then(() => {
                console.log('usuario para o proximo estagio salvo')
            })
        } catch (error) {
            console.log('erro ao enviar usuario para o proximo estagio: ' + error)
        }
        return [
            `Olá, ${contato} sou uma assistente virtual, irei apresentar o carpádio, para fazer o pedido basta enviar o codigo do produto`,
            menu,
        ];
    } else {
        banco.db[user].stage = 0;
        key = 1
        return ['Olá, Qual seu Nome?']
    }
}

exports.execute = execute;
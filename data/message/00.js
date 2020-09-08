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
    //passa cada primeira letra para maiuscula
    cardapio.forEach(e => menu += `${e.dataValues.id} - ${e.dataValues.class.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })} \n`)


    /*Object.keys(cardapio.menu).forEach((value) => {
      let element = cardapio.menu[value];
      menu += `${value} - ${element.descricao}\n`;
    });*/

    if (key === 1) {
        //Nome da pessoa Digitado = contato

        contato = msg
        banco.db[user].stage = 1;
        //console.log('\n\n' + user + '\n\n')
        // passando user para estagio 01
        async function temp() {
            await User.findOne({ where: { telephone: user } }).then((usuario) => {
                console.log(usuario)
                usuario.stage = 1,
                    usuario.save().then(() => {
                        console.log('ok')
                    }).catch((err) => {
                        console.log(err)
                    })
            })
        }

        temp()

        return [
            `Olá, ${contato} sou uma assistente virtual, irei apresentar o carpádio, para fazer o pedido basta enviar o codigo do produto`,
            menu,
        ]
    }


    if (contato) {
        //Nome da pessoa já Cadastrada na sua lista de contatos
        banco.db[user].stage = 1;
        //console.log('\n\n' + user + '\n\n')
        // passando user para estagio 01
        async function temp() {
            await User.findOne({ where: { telephone: user } }).then((usuario) => {
                console.log(usuario)
                usuario.stage = 1,
                    usuario.save().then(() => {
                        console.log('ok')
                    }).catch((err) => {
                        console.log(err)
                    })
            })
        }

        temp()
        return [
            `Olá, ${contato} sou uma assistente virtual, irei apresentar o carpádio, para fazer o pedido basta enviar o codigo do produto`,
            menu,
        ];
    } else {
        async function temp() {
            await User.findOne({ where: { telephone: user } }).then((usuario) => {
                console.log(usuario)
                usuario.stage = 0,
                    usuario.save().then(() => {
                        console.log('ok')
                    }).catch((err) => {
                        console.log(err)
                    })
            })
        }
        temp()
        banco.db[user].stage = 0;
        key = 1
        return ['Olá, Qual seu Nome?']
    }
}

exports.execute = execute;
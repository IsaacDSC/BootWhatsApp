require('module-alias/register')
    //const cardapio = require('@data/cardapio/cardapio')
const banco = require('@data/user/user')
const User = require('@models/Users')

function execute(user, msg) {
    if (msg === "*") {
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
        banco.db[user] = ""
        return ["Pedido cancelado com sucesso"];
    }

    if (msg === "#") {
        async function temp() {
            await User.findOne({ where: { telephone: user } }).then((usuario) => {
                console.log(usuario)
                usuario.stage = 3,
                    usuario.save().then(() => {
                        console.log('ok')
                    }).catch((err) => {
                        console.log(err)
                    })
            })
        }

        temp()
        banco.db[user].stage = 3;
        return ["Digite o endereço completo por favor :"];
    }

    let resumo = "  RESUMO DO PEDIDO \n";
    let total = 0;
    banco.db[user].itens.forEach((value) => {
        console.log(value);
        resumo += `${value.descricao} --- ${value.preco} \n`;

        total += value.preco;
    });

    resumo += "-------------------------\n";
    resumo += ` Total R$ ${total}`;

    return [resumo, "Para confirmar digite # ou para cancelar digite * "];
}

exports.execute = execute;
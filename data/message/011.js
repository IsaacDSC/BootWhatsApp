require('module-alias/register')
const cardapio = require('@data/cardapio/promocoes')
const cardapio = require('@data/cardapio/lanches')
const banco = require('@data/user/user')
const User = require('@models/Users')
let key = 0;


function execute(user, msg) {
    let menu = "*Cardapio*\n\n"
    Object.keys(cardapio.menu).forEach((value) => {
        let element = cardapio.menu[value]
        menu += `${value} - ${element.nome} Valor: R$ ${element.valor} \n`
    })
    if (msg === '*') {
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
        banco.db[user].stage = 0
        return ["Pedido Cancelado com Sucesso!"]
    }
    if (msg === "#") {
        async function temp() {
            await User.findOne({ where: { telephone: user } }).then((usuario) => {
                console.log(usuario)
                usuario.stage = 2,
                    usuario.save().then(() => {
                        console.log('ok')
                    }).catch((err) => {
                        console.log(err)
                    })
            })
        }

        temp()
        banco.db[user].stage = 2
        return ["Estamos Finalizando seu pedido, ok?"]
    }
    if (!cardapio.menu[msg]) {
        return ["Codigo invalido.\nDigite um código valido por favor!", "```Digite # para Finalizar ou * para Cancelar```"]
    }


    banco.db[user].itens.push(cardapio.menu[msg])
    return [menu, `Item: (${cardapio.menu[msg].nome}) adionando com sucesso!`, "```Digite # para Finalizar ou * para Cancelar```"]

}


exports.execute = execute
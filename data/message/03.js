require('module-alias/register')
const stages = require("@data/stages")
const banco = require('@data/user/user')
const User = require('@models/Users')

function execute(user, msg) {
    if (msg === "*") {
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
        banco.db[user] = ""
        return ["Digite o endereço completo por favor :"];
    }

    if (msg === "#") {
        async function temp() {
            await User.findOne({ where: { telephone: user } }).then((usuario) => {
                console.log(usuario)
                usuario.stage = 4,
                    usuario.save().then(() => {
                        console.log('ok')
                    }).catch((err) => {
                        console.log(err)
                    })
            })
        }

        temp()
        banco.db[user].stage = 4;

        return stages.step[4].obj.execute(user, "");
    }
    banco.db[user].itens.push({ endereço: msg });
    console.log(banco.db[user])
    return [
        `Confirma endereco de entrega : \n ${msg}`,
        "```Digite # para continuar ou * para voltar```",
    ];
}

exports.execute = execute;
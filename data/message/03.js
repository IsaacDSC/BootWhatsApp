require('module-alias/register')
const stages = require("@data/stages")
const banco = require('@data/user/user')
const User = require('@models/Users')
const setStage = require('../../src/helpers/setStage')

function execute(user, msg) {












    
    if (msg === "*") {
        setStage.envStageDb(user, 3)
        banco.db[user].stage = 3;
        banco.db[user] = ""
        return ["Digite o endereço completo por favor :"];
    }

    if (msg === "#") {
        setStage.envStageDb(user, 4)
        
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
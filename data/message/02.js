require('module-alias/register')
    //const cardapio = require('@data/cardapio/cardapio')
const banco = require('@data/user/user')
const User = require('@models/Users')
const setStage = require('../../src/helpers/setStage')
const a = require('../../src/helpers/getMenu')

async function execute(user, msg) {
    let menu
    await a.getMenu().then((res) => menu = res.toString())

    if(msg.toUpperCase() === "V"){
        setStage.envStageDb(user, 1)
        banco.db[user].stage = 1;
        return [menu];
    }
    if (msg === "*") {
        setStage.envStageDb(user, 0)
        
        banco.db[user].stage = 0;
        banco.db[user] = ""
        return ["Pedido cancelado com sucesso"];
    }

    if (msg === "#") {
        setStage.envStageDb(user, 3)
        
        banco.db[user].stage = 3;
        return ["Digite o endereço completo por favor :"];
    }

    let resumo = "  RESUMO DO PEDIDO \n";
    let total = 0;
    //Pegar esses itens do Banco de Dados
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
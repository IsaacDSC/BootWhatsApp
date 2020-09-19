require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");
const setStage = require('@helpers/setStage')
const getMenu = require('@helpers/getMenu');


async function execute(user, msg) {

    await getMenu.getMenu(user).then((res) => menu = res.toString())

    const frase = '🔤  Se desejar, digite alguma *OBSERVAÇÃO PARA O SEU PEDIDO*.\n\n───────────────\n[ N ] NÃO TENHO OBSERVAÇÃO'
    const frase1 = 'Se desejar, digite alguma *OBSERVAÇÃO PARA O AGENDAMENTO DO SEU PEDIDO*.\n\nPor exemplo: dia e horário que deseja agendar.\n\n───────────────\n*[ N ]* CONTINUAR SEM OBSERVAÇÃO'

    if (msg.toUpperCase() === "V") {
        escolha.db[user].escolha = []
        setStage.envStageDb(user, 1)
        banco.db[user].stage = 1;
        return [menu];
    }
    if (msg > 4) {
        return ['Opção Invalida escolha dentre esses numeros']
    }
    //If 2 RETIRAR NO BALCAO
    if (msg == 2) {
        banco.db[user].stage = 11;
        escolha.db[user].dadosEntrega = "RETIRAR NO BALCAO"
        return [frase1]
    }
    //If 2 COMER AQUI NO LOCAL
    if (msg == 3) {
        escolha.db[user].dadosEntrega = "COMER AQUI NO LOCAL"
        banco.db[user].stage = 11;
        return [frase1]
    }
    //If 2 AGENDAR A RETIRADA
    if (msg == 4) {
        escolha.db[user].dadosEntrega = "AGENDAR A RETIRADA"
        banco.db[user].stage = 11;
        return [frase1]
    }
    if (msg == 1) {
        escolha.db[user].dadosEntrega = 'ENTREGAR NO ENDEREÇO'
        banco.db[user].stage = 6;
        return ['🏠  Digite seu endereço (nome da rua, número, complemento e ponto de referência) para entregar.\n\n───────────────\n*[ V ]* MENU ANTERIOR']
    }

    return ['Opção Invalida']

}


module.exports = {
    execute: execute
}
require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");
const setStage = require('../../helpers/setStage')

async function execute(user, msg) {
    let valorTotal = 0
    //add
    valorTotal = 0
    const frase = '🔤  Se desejar, digite alguma *OBSERVAÇÃO PARA O SEU PEDIDO*.\n\n───────────────\n[ N ] NÃO TENHO OBSERVAÇÃO'

    await escolha.db[user].itens.forEach(e => {
        valorTotal += e.itens.price * e.quantity
    })



    if (msg.toUpperCase() == "N") {
        escolha.db[user].trocoPara = "Não Precisa De Troco"
        banco.db[user].stage = 11
        setStage.envStageDb(user, 11)
        return [frase]
    }
    if (msg.split("").filter(n => (Number(n) || n == 0)).join("") < (escolha.db[user].valorTaxa + valorTotal) || !Number(msg.split("").filter(n => (Number(n) || n == 0)).join(""))) {

        return ["Por favor Informe Um troco Valido"]
    }
    escolha.db[user].trocoPara = msg.split("").filter(n => (Number(n) || n == 0)).join("")
    banco.db[user].stage = 11
    setStage.envStageDb(user, 11)
    return [frase]
}




module.exports = {
    execute: execute
}
require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");
const enviaParaFrontend = require('../../server')
const getMenu = require('@helpers/getMenu')


async function execute(user, msg, contato) {
    
    const frase = '🔤  Se desejar, digite alguma *OBSERVAÇÃO PARA O SEU PEDIDO*.\n\n───────────────\n[ N ] NÃO TENHO OBSERVAÇÃO'

    await getMenu.getMenu(user).then((res) => menu = res.toString())

    if (msg.toUpperCase() == 'E') {
        banco.db[user].stage = 1;
        return [menu];
    }
    if (msg.toUpperCase() == 'F') {
        banco.db[user].stage = 11;
        return [frase];
    }
  //falta terminar
 /* if(msg>quantidadeDeitensNoCarrinho){

  }*/


    return ['Você precisa digitar *F* para que eu possa estar finalizando seu pedido.']


}

module.exports = {
    execute: execute
}
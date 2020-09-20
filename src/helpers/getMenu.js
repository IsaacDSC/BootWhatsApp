const Cardapio = require('../models/Menu')
const escolha = require("../../data/escolha");

async function getMenu(user) {
    let menu = '🔢 Digite o *número* da categoria:\n\n ```Digite apenas 1 número.```\n\n';
    //Cardapio Obtido Do Banco de Dados só Obtem as classes
    const cardapio = await Cardapio.findAll({
        attributes: ['class'],
        group: ['class']
    })

    cardapio.forEach((e, index) => {
        escolha.db[user].escolha.push({ 'id': index + 1, 'class': e.dataValues.class })
        return menu += `*[ ${index+1} ]* ${e.dataValues.class.toUpperCase()} \n`
    })
    menu += '\nDica:\nse quer *' + escolha.db[user].escolha[0].class.toUpperCase() + '* envie o número *1*.\n\n───────────────'

    if(escolha.db[user].itens.length>0){
        menu+= '\n*[ F ]* *FECHAR O PEDIDO*'
    }
    return menu 
}


exports.getMenu = getMenu
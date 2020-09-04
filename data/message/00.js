require('module-alias/register')
const cardapio = require('@data/cardapio/cardapio')
const banco = require('@data/user/user')
const Menu = require('@models/Menu')

function execute(user, msg) {
    const menu = Menu.findAll()
    const listMenu = menu.map(menu[`${listMenu.length}*${menu.name}*\n${menu.desc}\n*${menu.value}*`])
        /* function execute(user, msg) {
            Menu.findAll().then((menu) => {
                menu.forEach(element => {
                    var menu = element
                        //console.log(menu)

                });
            }) */
        //banco.db[user].stage = 1
        //return ["Olá Sou a Amanda sua assistente virtual. \nIrei apresentar o Cadrdapio basta enviar o código do produto para escolher", listMenu]

    /* 
        let menu = "*Cardapio*\n\n"
        Object.keys(cardapio.menu).forEach((value) => {
            let element = cardapio.menu[value]
            menu += `${value} - ${element.nome} Valor: R$ ${element.valor} \n`
        })

        banco.db[user].stage = 1

        return ["Olá Sou a Amanda sua assistente virtual. \nIrei apresentar o Cadrdapio basta enviar o código do produto para escolher", menu] */
}
execute()

exports.execute = execute
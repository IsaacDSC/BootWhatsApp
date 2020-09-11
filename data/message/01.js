require('module-alias/register')
const cardapio = require('@data/cardapio/promocoes')
const escolha = require("../escolha");
const Menu = require('@models/Menu')
const User = require('@models/Users')
const Requests = require('@models/Requests')
const banco = require('@data/user/user')
const setStage = require('../../src/helpers/setStage')

let key = 0;

async function execute(user, msg) {

    const frase = "```Digite # para finalizar * para cancelar & para voltar ao cardápio```"

    if (msg === "*") {
        setStage.envStageDb(user, 0)

        key = 0
        banco.db[user].stage = 0;
        banco.db[user] = ""
        console.log(banco.db[user])
        return ["Pedido cancelado com sucesso"];
    }
    if (msg === "#") {
        setStage.envStageDb(user, 2)
        key = 0
        banco.db[user].stage = 2;
        return ["Estamos fechando seu pedido, ok?"];
    }

    const quantidadedeEscolhas = await Menu.findAll({
        attributes: ['class'],
        group: ['class']
    })

    //quantidade de classes 
    if (msg > quantidadedeEscolhas.length && key == 0 || !Number(msg) ) {
        return [
            "Você *precisa* escolher um número da categoria."
        ];
    }

    //Adiciona o item ao carrinho
    if (key === 1) {
        const itemEscolhido = escolha.db.filter(e => { return e.index == msg })
        const UserId = await User.findAll({ where: { telephone: user }, attributes: ['id'] })
        const MenuNameId = await Menu.findAll({ where: { name: itemEscolhido[0].name }, attributes: ['id'] })
        //Só adiciona um item
        Requests.create({
            MenuNameId: MenuNameId[0].dataValues.id,
            UserId: UserId[0].dataValues.id,
            quantity: 1,
            status: 0
        }).then(() => console.log('Produto Cadastrado Para O Usuario'))
        .catch((err)=>console.log(err))

        banco.db[user].itens.push(cardapio.menu[msg]);

        //Coloca o Item escolhido do usuario ao banco de dados 

        return [`Item(${itemEscolhido[0].name}) adiconado com sucesso `,
            frase,
        ]

    } else {
        // Numero Digitado pega a class
        const classe = quantidadedeEscolhas[msg - 1].dataValues.class

        const itensMenu = await Menu.findAll({ where: { class: classe } })
        let menu = '🔢 Digite o *número* do produto:\n\n ```Digite apenas 1 número.```\n\n'
        key = 1

        itensMenu.forEach((e, index) => {
            escolha.db.push({ 'index': index + 1, 'name': e.dataValues.name, 'price': e.dataValues.value })

            return menu += `*[ ${index + 1} ]* ${e.dataValues.name.toUpperCase()}- _${e.dataValues.value}_ \n`;
        })
        //parte final da String
        menu += "\n───────────────\n*[ V ]* MENU ANTERIOR"

        return [menu, frase];
    }
}

exports.execute = execute;
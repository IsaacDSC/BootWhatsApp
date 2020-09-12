require('module-alias/register')
const cardapio = require('@data/cardapio/promocoes')
const escolha = require("../escolha");
const Menu = require('@models/Menu')
const User = require('@models/Users')
const Requests = require('@models/Requests')
const banco = require('@data/user/user')
const setStage = require('../../src/helpers/setStage')
const a = require('../../src/helpers/getMenu')
let key = 0;
let msgItem
async function execute(user, msg) {

   

    let menu
    await a.getMenu().then((res) => menu = res.toString())

    if (msg.toUpperCase() === "V" || msg.toUpperCase() === "E" && key == 3) {
        key = 0
        return [menu];
    }
    if (msg.toUpperCase() == 'F') {
        setStage.envStageDb(user, 2)
        key = 0
        banco.db[user].stage = 2;
        return ["Estamos fechando seu pedido, ok?"];
    }
    // if (msg === "*") {
    //     setStage.envStageDb(user, 0)
    //     key = 0
    //     banco.db[user].stage = 0;
    //     banco.db[user] = ""
    //     console.log(banco.db[user])
    //     return ["Pedido cancelado com sucesso"];
    // }
    // if (msg === "#") {
    //     setStage.envStageDb(user, 2)
    //     key = 0
    //     banco.db[user].stage = 2;
    //     return ["Estamos fechando seu pedido, ok?"];
    // }

    const quantidadedeEscolhas = await Menu.findAll({
        attributes: ['class'],
        group: ['class']
    })

    //quantidade de classes 
    if (msg > quantidadedeEscolhas.length && key == 0 || !Number(msg) && key == 0) {
        return [
            "Você *precisa* escolher um número da categoria."
        ];
    }
    //Adiciona o item ao carrinho
    //Cadastra o Pedido No banco de Dados
    //msg = ao item escolhido
    if (key === 2) {
        msgItem = msg
        const itemEscolhido = await escolha.db.filter(e => { return e.index == msgItem })
        key = 1
        return ['🔢  Quantos produtos *' + itemEscolhido[0].name + '* iguais a este você quer pedir?\n\n *Digite um número para gravar este produto.*']
    }

    if (key === 1 && !Number(msg) || msg >= 100) {
        console.log(msgItem)
        return ['🔢  Quantidade muito alta.\nLimite máximo por pedido 100 unidades.']
    }


    //msg = quantidade de itens
    if (key === 1) {
        key = 3

        const itemEscolhido = await escolha.db.filter(e => { return e.index == msgItem })
        const UserId = await User.findAll({ where: { telephone: user }, attributes: ['id'] })
        const MenuNameId = await Menu.findAll({ where: { name: itemEscolhido[0].name }, attributes: ['id'] })

        Requests.create({
                MenuNameId: MenuNameId[0].dataValues.id,
                UserId: UserId[0].dataValues.id,
                quantity: msg,
                status: 0
            }).then(() => console.log('Produto Cadastrado Para O Usuario'))
            .catch((err) => console.log(err))

        console.log(`Quantidade(${msg}) adiconado com sucesso `)

        banco.db[user].itens.push(cardapio.menu[msg]);

        //Coloca o Item escolhido do usuario ao banco de dados 

        return [`👏  Produto *gravado* no carrinho.`, 'Deseja escolher *outro* produto?\n\n───────────────\n\n*[ E ]* ESCOLHER OUTRO PRODUTO\n*[ M ]* ESCOLHER MAIS *AÇAÍ*\n\n*[ F ]* *PARA FECHAR O PEDIDO*']

    } else {
        // Numero Digitado pega a class
        const classe = quantidadedeEscolhas[msg - 1].dataValues.class

        const itensMenu = await Menu.findAll({ where: { class: classe } })
        let menu = '🔢 Digite o *número* do produto:\n\n ```Digite apenas 1 número.```\n\n'
        key = 2

        itensMenu.forEach((e, index) => {
                escolha.db.push({ 'index': index + 1, 'name': e.dataValues.name, 'price': e.dataValues.value })

                return menu += `*[ ${index + 1} ]* ${e.dataValues.name.toUpperCase()}- _${e.dataValues.value}_ \n`;
            })
            //parte final da String
        menu += "\n───────────────\n*[ V ]* MENU ANTERIOR"

        return [menu];
    }
}

exports.execute = execute;
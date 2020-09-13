require('module-alias/register')
const cardapio = require('@data/cardapio/promocoes') // tirar e excluir dependência de arquivo
const escolha = require("@data/escolha"); //arquivo com diretorio errado tbm tirar dependencia e excluir

//models do banco de dados
const Menu = require('@models/Menu')
const User = require('@models/Users')
const Requests = require('@models/Requests')

const banco = require('@data/user/user') //configuração que fica ate o final armazenando usuarios que o boot responderá e armazenando os itens para Total da compra
    //arquivos que devem estar em pastas controllers porem se encontram em helpers ainda
const setStage = require('@helpers/setStage')
const getMenu = require('@helpers/getMenu')

let key = 0;
let msgItem
let msgItemMais


async function execute(user, msg) {
    let menu //armazena os cardapios provindos do banco de dados
    await getMenu.getMenu().then((res) => menu = res.toString())

    const quantidadedeEscolhas = await Menu.findAll({
        attributes: ['class'],
        group: ['class']
    })

    if (msg.toUpperCase() === "V" && key == 2 || msg.toUpperCase() === "E" && key == 3) {
        escolha.db = []
        key = 0
        return [menu];
    }

    if (msg.toUpperCase() === "M") {
        const classe = quantidadedeEscolhas[msgItemMais - 1].dataValues.class
        const itensMenu = await Menu.findAll({ where: { class: classe } })
        let message = '🔢 Digite o *número* do produto:\n\n ```Digite apenas 1 número.```\n\n'
        key = 2
        itensMenu.forEach((e, index) => {
                escolha.db.push({ 'index': index + 1, 'name': e.dataValues.name, 'price': e.dataValues.value })

                return message += `*[ ${index + 1} ]* ${e.dataValues.name.toUpperCase()}- _${e.dataValues.value}_ \n`;
            })
            //parte final da String
        message += "\n───────────────\n*[ V ]* MENU ANTERIOR"
        message += "\n*[ F ]* PARA FECHAR O PEDIDO"
        return [message];
    }

    //Carrega as opçoes de envio do pedido
    if (msg.toUpperCase() == 'F' && key == 3 || key == 2 && msg.toUpperCase() === "F") {
        setStage.envStageDb(user, 2)
        key = 0
        banco.db[user].stage = 2;
        return ["👏  *Está quase no final.*\nVamos definir os dados de entrega e o pagamento.", ' 🔢  Como deseja receber o pedido:\n\n*[ 1 ]* ENTREGAR NO ENDEREÇO\n*[ 2 ]* RETIRAR NO BALCAO\n*[ 3 ]* COMER AQUI NO LOCAL\n*[ 4 ]* AGENDAR A RETIRADA\n\n───────────────\n*[ V ]* MENU ANTERIOR'];

    }

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
        return ['🔢  Quantidade muito alta.\nLimite máximo por pedido 100 unidades.']
    }


    //msg = quantidade de itens
    if (key === 1) { //esta no stage01
        key = 3 //levar para arquivo 03.js

        const itemEscolhido = await escolha.db.filter(e => { return e.index == msgItem })
        const UserId = await User.findAll({ where: { telephone: user }, attributes: ['id'] })
        const MenuNameId = await Menu.findAll({ where: { name: itemEscolhido[0].name }, attributes: ['id', 'class'] })

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

        return [`👏  Produto *gravado* no carrinho.`, 'Deseja escolher *outro* produto?\n\n───────────────\n\n*[ E ]* ESCOLHER OUTRO PRODUTO\n*[ M ]* ESCOLHER MAIS *' + MenuNameId[0].dataValues.class.toUpperCase() + '*\n\n*[ F ]* *PARA FECHAR O PEDIDO*']

    } else {
        msgItemMais = msg
            // Numero Digitado pega a class
        const classe = quantidadedeEscolhas[msg - 1].dataValues.class
        const itensMenu = await Menu.findAll({ where: { class: classe } })
        let message = '🔢 Digite o *número* do produto:\n\n ```Digite apenas 1 número.```\n\n'
        key = 2
        itensMenu.forEach((e, index) => {
                escolha.db.push({ 'index': index + 1, 'name': e.dataValues.name, 'price': e.dataValues.value })

                return message += `*[ ${index + 1} ]* ${e.dataValues.name.toUpperCase()}- _${e.dataValues.value}_ \n`;
            })
            //parte final da String
        message += "\n───────────────\n*[ V ]* MENU ANTERIOR"

        return [message];
    }
}

exports.execute = execute;
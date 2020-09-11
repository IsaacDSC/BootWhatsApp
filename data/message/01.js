require('module-alias/register')
const cardapio = require('@data/cardapio/promocoes')
const escolha = require("../escolha");
const Menu = require('@models/Menu')
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

    const quantidadedeEscolhas = escolha.db.filter(e => { return e.id }).length
    console.log(Number(msg))
    if (msg > quantidadedeEscolhas || !Number(msg)) {
        return [
            "Você *precisa* escolher um número da categoria."
        ];
    } else {

        //Adiciona o item ao carrinho 

        if (key === 1) {
            banco.db[user].itens.push(cardapio.menu[msg]);
            const itemEscolhido = escolha.db.filter(e => { return e.index == msg })

            //Coloca o Item escolhido do usuario ao banco de dados 

            return [`Item(${itemEscolhido[0].name}) adiconado com sucesso `,
                frase,
            ]

        } else {
            // Numero Digitado pega a class
            const classe = escolha.db.filter(e => { return e.id == msg })
            clas = classe[0].class
            const itensMenu = await Menu.findAll({ where: { class: clas } })
            let menu = '🔢 Digite o *número* do produto:\n\n ```Digite apenas 1 número.```\n\n'
            menu += ` ${clas.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })} \n\n`;
            key = 1

            itensMenu.forEach((e, index) => {
                escolha.db.push({ 'index': index + 1, 'name': e.dataValues.name, 'price': e.dataValues.value })

                return menu += `${index+1} - ${e.dataValues.name}        R$ ${e.dataValues.value} \n`;
            })
            return [menu, frase];
        }
    }


}

exports.execute = execute;
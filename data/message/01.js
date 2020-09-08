require('module-alias/register')
const cardapio = require('@data/cardapio/promocoes')
const lanches = require('@data/cardapio/lanches')
const Menu = require('@models/Menu')
const banco = require('@data/user/user')
const User = require('@models/Users')

let key = 0;

async function execute(user, msg) {

    const frase = "```Digite # para finalizar * para cancelar & para voltar ao cardápio```"

    if (msg === "*") {
        async function temp() {
            await User.findOne({ where: { telephone: user } }).then((usuario) => {
                console.log(usuario)
                usuario.stage = 0,
                    usuario.save().then(() => {
                        console.log('ok')
                    }).catch((err) => {
                        console.log(err)
                    })
            })
        }
        temp()
        key = 0
        banco.db[user].stage = 0;
        banco.db[user] = ""
        console.log(banco.db[user])
        return ["Pedido cancelado com sucesso"];
    }
    if (msg === "#") {
        async function temp() {
            await User.findOne({ where: { telephone: user } }).then((usuario) => {
                console.log(usuario)
                usuario.stage = 2,
                    usuario.save().then(() => {
                        console.log('ok')
                    }).catch((err) => {
                        console.log(err)
                    })
            })
        }
        temp()
        key = 0
        banco.db[user].stage = 2;
        return ["Estamos fechando seu pedido, ok?"];
    }
    
    //Adiciona o item ao carrinho 
    //Falta terminar , colocar o item escolhido pelo usuario no carrinho e mostrar o nome do item
    if (key === 1) {
        banco.db[user].itens.push(cardapio.menu[msg]);

        return [`Item(${cardapio.menu[msg].descricao}) adiconado com sucesso `,
            frase,
        ]
        
    }else{
         // Numero Digitado pega a class 
        const cardapio = await Menu.findAll({ where: { id: Number(msg) } })
        const clas = cardapio[0].dataValues.class 
        const itensMenu = await Menu.findAll({where:{class:clas}})

        let menu = ` ${clas.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })} \n\n`;
        key = 1
        itensMenu.forEach((e,index)=>{
            menu += `${index+1} - ${e.dataValues.name}        R$ ${e.dataValues.value} \n`;
        })

        return [menu, frase];
}
 

   /* if (key === 1) {
        banco.db[user].itens.push(cardapio.menu[msg]);

        return [`Item(${cardapio.menu[msg].descricao}) adiconado com sucesso `,
            frase,
        ]
    }
    if (key === 2) {
        banco.db[user].itens.push(lanches.menu[msg]);

        return [`Lanche(${lanches.menu[msg].descricao}) adiconado com sucesso `,
            frase,
        ]
    }
    if (key === 3) {
        banco.db[user].itens.push(lanches.menu[msg]);

        return [`Item(${lanches.menu[msg].descricao}) adiconado com sucesso `,
            frase,
        ]
    }

    if (msg === "1") {
        key = 1
        let menu = " Promoções \n\n";
        Object.keys(cardapio.menu).forEach((value) => {
            let element = cardapio.menu[value];
            menu += `${value} - ${element.descricao}        R$ ${element.preco} \n`;
        });
        return [menu, frase];
    }




    if (msg === "2") {
        key = 2
        let menu = " Lanches \n\n";

        Object.keys(lanches.menu).forEach((value) => {
            let element = lanches.menu[value];
            menu += `${value} - ${element.descricao}        R$ ${element.preco} \n`;
        });
        return [menu];


    }
    if (msg === "3") {
        key = 3
        let menu = " Bebidas \n\n";

        Object.keys(cardapio.menu).forEach((value) => {
            let element = cardapio.menu[value];
            menu += `${value} - ${element.descricao}        R$ ${element.preco} \n`;
        });
        return [menu];


    }
*/

    if (!cardapio.menu[msg]) {
        return [
            "Código inválido, digite corretamente",
            "```Digite # para finalizar ou * para cancelar```",
        ];
    }

}

exports.execute = execute;
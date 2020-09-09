require('module-alias/register')
const cardapio = require('@data/cardapio/promocoes')
const escolha = require("../escolha");
const Menu = require('@models/Menu')
const Requests = require('@models/Requests')
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
    
    const quantidadedeEscolhas= escolha.db.filter(e=>{return e.id}).length
    if (msg>quantidadedeEscolhas) {
        return [
            "Código inválido, digite corretamente",
            "```Digite # para finalizar ou * para cancelar```",
        ];
    }else{
    
    //Adiciona o item ao carrinho 
    
    if (key === 1) {
        banco.db[user].itens.push(cardapio.menu[msg]);
        const itemEscolhido= escolha.db.filter(e=>{return e.index ==msg}) 

    //Coloca o Item escolhido do usuario ao banco de dados 
    //Só esta cadastrado um produto esta dando duplicidade de client 
       Requests.create({
            client: user,
            package: itemEscolhido[0].name ,
            profit: 1,
            spent: 1,
            status: 0,
        })
        .then(console.log('Pedido Cadastrado Com Sucesso'))
        .catch(err=>console.log(err))
        
        return [`Item(${itemEscolhido[0].name}) adiconado com sucesso `,
            frase,
        ]
        
    }else{
         // Numero Digitado pega a class
        const classe= escolha.db.filter(e=>{return e.id ==msg}) 
        clas= classe[0].class
        const itensMenu = await Menu.findAll({where:{class:clas}})

        let menu = ` ${clas.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })} \n\n`;
        key = 1
        itensMenu.forEach((e,index)=>{
            escolha.db.push({'index':index+1,'name':e.dataValues.name, 'price':e.dataValues.value})

           return menu += `${index+1} - ${e.dataValues.name}        R$ ${e.dataValues.value} \n`;
        })
        return [menu, frase];
}}
 

}

exports.execute = execute;
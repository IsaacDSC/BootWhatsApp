require('module-alias/register')
const banco = require('@data/user/user')
const Menu = require('../../helpers/getMenu')
const setStage = require('../../helpers/setStage')
const escolhas = require('@data/escolha')
const NovoClienteAtendimento = require('../../server');

let key = 0

async function execute(user, msg, contato) {
  
    await Menu.getMenu(user).then((res) => menu = res.toString())
  

    if (key === 1) {
         NovoClienteAtendimento.NovoClienteAtendimento({soma:1})
        //Nome da pessoa Digitado = contato
        contato = msg
        
        escolhas.db[user].nome = contato
        banco.db[user].stage = 1;
        //console.log('\n\n' + user + '\n\n')
        // passando user para estagio 01
        setStage.envStageDb(user, 1)
        return [menu,
            `Olá, *${contato}* sou uma assistente virtual, irei apresentar o carpádio, para fazer o pedido basta enviar o codigo do produto`,
        ]
    }


    if (contato) {
       escolhas.db[user].nome = contato
         NovoClienteAtendimento.NovoClienteAtendimento({soma: 1})
        //Nome da pessoa já Cadastrada na sua lista de contatos
        banco.db[user].stage = 1;
        setStage.envStageDb(user, 1)
        return [menu,
            `Olá, *${contato}* sou uma assistente virtual, irei apresentar o carpádio, para fazer o pedido basta enviar o codigo do produto`,
        ];
    } else {
        setStage.envStageDb(user, 0)

        banco.db[user].stage = 0;
        key = 1
        return ['Olá, Qual seu Nome?']
    }
}

exports.execute = execute;
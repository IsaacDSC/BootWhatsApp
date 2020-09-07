require('module-alias/register')
const cardapio = require('@data/cardapio/inicio')
const banco = require('@data/user/user')

const Menu = require('@models/Menu')
let key =0


function execute(user, msg, contato) {
    let menu = " CARDAPIO \n\n";
   console.log(contato)
    Object.keys(cardapio.menu).forEach((value) => {
      let element = cardapio.menu[value];
      menu += `${value} - ${element.descricao}\n`;
    });
    
    if(key===1){
      //Nome da pessoa Digitado = contato
      
        contato = msg
        banco.db[user].stage = 1;
        return [
          `Olá, ${contato} sou uma assistente virtual, irei apresentar o carpádio, para fazer o pedido basta enviar o codigo do produto`,
          menu,
        ]
      }
   
  
    if(contato){
      //Nome da pessoa já Cadastrada na sua lista de contatos
     
      banco.db[user].stage = 1;
    return [
      `Olá, ${contato} sou uma assistente virtual, irei apresentar o carpádio, para fazer o pedido basta enviar o codigo do produto`,
      menu,
    ];}else{
      banco.db[user].stage = 0;
      key=1
      return[ 'Olá, Qual seu Nome?']
    }
  }
  
  exports.execute = execute;
  
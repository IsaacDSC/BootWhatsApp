require('module-alias/register')
const cardapio = require('@data/cardapio/promocoes')
const lanches = require('@data/cardapio/lanches')
const banco = require('@data/user/user')
let key = 0;

function execute(user, msg) {
  
    const frase ="```Digite # para finalizar * para cancelar & para voltar ao cardápio```"
  
    if (msg === "*") {
      key = 0
      banco.db[user].stage = 0;
      banco.db[user]=""
      console.log(banco.db[user])
      return ["Pedido cancelado com sucesso"];
    } 
     if (msg === "#") {
      key = 0
      banco.db[user].stage = 2;
      return ["Estamos fechando seu pedido, ok?"];
    }
  
    if (key === 1) {
      banco.db[user].itens.push(cardapio.menu[msg]);
      
      return [`Item(${cardapio.menu[msg].descricao}) adiconado com sucesso `,
      frase,]
    }
    if (key === 2) {
      banco.db[user].itens.push(lanches.menu[msg]);
      
      return [`Lanche(${lanches.menu[msg].descricao}) adiconado com sucesso `,
     frase,]
    }
    if (key === 3) {
      banco.db[user].itens.push(lanches.menu[msg]);
      
      return [`Item(${lanches.menu[msg].descricao}) adiconado com sucesso `,
     frase,]
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
      key=3
      let menu = " Bebidas \n\n";
  
      Object.keys(cardapio.menu).forEach((value) => {
        let element = cardapio.menu[value];
        menu += `${value} - ${element.descricao}        R$ ${element.preco} \n`;
      });
      return [menu];
  
  
    }
  
  
    if (!cardapio.menu[msg]) {
      return [
        "Código inválido, digite corretamente",
        "```Digite # para finalizar ou * para cancelar```",
      ];
    }
  
  }
  
  exports.execute = execute;
  
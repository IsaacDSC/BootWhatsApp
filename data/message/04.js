require('module-alias/register')
const banco = require('@data/user/user')

let estagioInterno = 0;

function execute(user, msg) {
  //banco.db[user].stage = 0;

  if (estagioInterno === 1 || msg==='2') {
    banco.db[user].stage = 0;
    
    return [
      "Obrigado pela preferencia.",
      "Aguarde, seu pedido chegará em breve",
      "Mais informações ligue para 33333-3333",
    ];

  }
  if (msg === "1") {
    estagioInterno++;
    return ["Digite o valor em dinheiro para levarmos o troco: "];
  }
  return ["Escolha a forma de pagamento:\n1️⃣-Dinheiro\n2️⃣-Cartão"];
}

exports.execute = execute;
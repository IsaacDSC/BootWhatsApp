const escolha = require("../data/save");

const user = 23
escolha.db[user].itens.push({'id':1 ,'class':'arroz'})

console.log( escolha.db.filter(e=>{return e.id}).length)
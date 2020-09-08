const escolha = require("../data/escolha");

escolha.db.push({'id':1 ,'class':'arroz'},{'id':5 ,'class':'feijao'},{'ss':5 ,'class':'feijao'})

console.log( escolha.db.filter(e=>{return e.id}).length)
const fs = require('fs')
let dir = './src/public/images/teste.text'
fs.writeFile(dir, 'Um breve texto aqui!', function(err) {
    //Caro ocorra algum erro
    if (err) {
        console.log(err)
        return console.log('erro')
    }
    //Caso não tenha erro, retornaremos a mensagem de sucesso
    console.log('Arquivo Criado');
});
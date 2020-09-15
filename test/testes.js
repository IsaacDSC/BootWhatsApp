var mensagem

setTimeout(() => {
    mensagem=3
}, 6000);

function enviar(client){
   if(mensagem){
        mandaMensagem('5524988180688@c.us','oii')
    }
    async function mandaMensagem(numero,mensagem){
        await client.sendText(numero, mensagem).then(()=>console.log('Mensagem Enviada Com Sucesso'))
    }  
    
}


exports.enviar = enviar
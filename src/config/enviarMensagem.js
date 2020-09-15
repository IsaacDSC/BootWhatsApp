let mensagem=0


function enviar(client){
  //  setInterval(()=>{
     if(mensagem!=0){
    mandaMensagem('5524988180688@c.us',mensagem)
    mensagem=0
    }
//},10000)
    async function mandaMensagem(numero,mensagem){
        await client.sendText(numero, mensagem).then(()=>console.log('Mensagem Enviada Com Sucesso'))
    }  
    
}


exports.enviar = enviar
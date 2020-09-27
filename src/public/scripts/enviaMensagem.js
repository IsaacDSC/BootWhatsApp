function mandaMensagem(numero, mensagem) {
        let resposta
        if(mensagem =='Cancelado'){
         resposta = confirm("Precione Ok para Cancelar o pedido!")
        }
        if(mensagem != 'Cancelado')
        {
                $.ajax({
                        type: "POST",
                        url: ipHost+'/mandamensagem',
                        data: { numero, mensagem },
                        success: console.log('Mensagem enviada Com Sucesso')
                })
        }
        if (resposta == true) {
                $.ajax({
                        type: "POST",
                        url: ipHost+'/mandamensagem',
                        data: { numero, mensagem },
                        success: console.log('Mensagem enviada Com Sucesso')
                }).then(() => location.reload())
        }
       return
        

}
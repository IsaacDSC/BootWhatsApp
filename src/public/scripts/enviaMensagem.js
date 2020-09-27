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
                if(mensagem=='Preparando'){
                let countPreparo = document.getElementById('countPreparoI')
                countPreparo.innerText = Number(countPreparo.textContent) +1
                }
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
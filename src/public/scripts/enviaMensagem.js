async function mandaMensagem(numero, mensagem,order) {
        let resposta
        if(mensagem =='Cancelado'){
         resposta = confirm("Precione Ok para Cancelar o pedido!")
        }
        if(mensagem != 'Cancelado')
        {
              await $.ajax({
                        type: "POST",
                        url: '/mandamensagem',
                        data: { numero, mensagem,order },
                        success: console.log('Mensagem enviada Com Sucesso')
                })
                if(mensagem=='Preparando'){
                let countPreparo = document.getElementById('countPreparoI')
                countPreparo.innerText = Number(countPreparo.textContent) +1
                }
                if(mensagem=='Entregue'){
                        location.reload()
                }
               
        }
        if (resposta == true) {
                $.ajax({
                        type: "POST",
                        url: '/mandamensagem',
                        data: { numero, mensagem,order },
                        success: console.log('Mensagem enviada Com Sucesso')
                }).then(() => location.reload())
        }
       return
        

}
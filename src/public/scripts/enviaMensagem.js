function mandaMensagem(numero, mensagem) {

        const resposta = confirm("Precione Ok para Cancelar o pedido!");
        if (resposta == true) {
                $.ajax({
                        type: "POST",
                        url: ipHost+'/mandamensagem',
                        data: { numero, mensagem },
                        success: console.log('Mensagem enviada Com Sucesso')
                }).then(() => location.reload())
        } else {
                return
        }

}
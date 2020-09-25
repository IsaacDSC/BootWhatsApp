function mandaMensagem(numero,mensagem){

        $.ajax({
                type: "POST",
                url: 'http://localhost:3001/mandamensagem',
                data: {numero,mensagem},
                success: console.log('Mensagem enviada Com Sucesso')
              })

}

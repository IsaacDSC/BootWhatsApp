function editar(order){
    $.ajax({
        type: "POST",
        url: '/editar/pedido',
        data: {order},
        success: console.log('Item cadastrado com sucesso')
    })

}
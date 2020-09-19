var socket = io('http://localhost:3000')

socket.on('PedidoConcluido', function (data) {
    console.log(data)
    renderPedido(data)
    playSound()
})
//Enviar o User e o Status do pedido quando mudar para o backend

var elemento = document.getElementById('pedidos');


async function renderPedido(dados) {
    let produtos;
    let total=0
    await dados.request.forEach(e =>total += e.quantity * e.itens.price)
    async function getProdutos() {
        let renderProdutos = ''
        await dados.request.forEach(e =>
         renderProdutos += `
        <tr>
        <td class="text-center">${e.class.toUpperCase()}</td>
            <td class="text-center">${e.itens.name.toUpperCase()}</td>
            <td class="text-center">${dados.observacao.toUpperCase()}</td>
            <td class="text-center">${e.quantity}x</td>
            <td class="text-center">${(e.quantity * e.itens.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
        </tr>
`
        )
        return renderProdutos
    }

    await getProdutos().then(res => produtos = res.toString())


  

    const html = ` <div class="col-sm-4">
<h4 class="card-title mb-0">Pedidos</h4>
<div class="small text-muted">October 2017</div>

</div>
<!--/.col-->
<hr>
<div class="col-sm-8 hidden-sm-down">

<button type="button" class="btn btn-primary float-right bg-flat-color-1"><i
        class="fa fa-print"></i></button>
<div class="btn-toolbar float-right" role="toolbar" aria-label="Toolbar with button groups">

</div>
</div>

<div class="form-group mt-1 col-12">
<p class="ml-3">Preparando <input type="radio" name="" id="" value="">&nbsp;&nbsp; Saiu para
    Entrega <input type="radio" name="" id="" value="">&nbsp;&nbsp; Entregue <input type="radio"
        name="" id="" value=""></p>
<hr>
</div>
<div class="form-group col-12">
<div class="form-group col-4">
    <h6 class=""><strong>Pedido: </strong> #</h6>
</div>

<div class="form-group col-8">
    <h6 class=""><strong>Nome: </strong> ${dados.name} &nbsp;&nbsp;&nbsp;<strong>Telefone:
        </strong> ${dados.telephone.split('@')[0]}</h6>
</div>

<div class="form-group ml-3">
    <h6 class="mt-1"><strong>Total: <i class="fa fa-money"></i></strong> ${total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}  ${dados.trocoPara ? `Troco Para:${dados.trocoPara.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}` : ''}</i></h6>
    <h6 class="mt-1"><strong>Foma de Pagamento: </strong><i class="fa fa-money"> </i> R$ 50,00
    </h6>
    <h6 class="mt-1"><strong>Foma de Pagamento: </strong><i class="fa  fa-credit-card">
            Cartao</i></h6>
    <h6 class="mt-1"><strong>Endereço: </strong> ${dados.Address ? dados.Address : ''}</h6>
    <h6 class="mt-1"><strong>Hora do Pedido: <i class="fa  fa-tachometer"></i></strong>
        ${dados.OrderTime.split(':')[0]}:${dados.OrderTime.split(':')[1]}Hr</i></h6>
    <h6 class="mt-1"><strong>Saiu para Entrega: <i class="fa  fa-rocket"></i></strong>
        22:00Hr</i></h6>
    <h6 class="mt-1"><strong>Entregue: <i class="fa  fa-check"></i></strong> 22:30Hr</i></h6>
</div>

</div>

<div class="form-group col-12">
<h5 class="text-center">Dados do Pedido</h5>
<table style="width:100%" border="1px black solid" class="mt-1">
    <tr>
    <th class="text-center">Tipo</th>
        <th class="text-center">Nome</th>
        <th class="text-center">Observação</th>
        <th class="text-center">Quantidade</th>
        <th class="text-center">Subtotal</th>
    </tr>
    ${produtos}
</table>
<hr class="mt-5">
</div>`





    elemento.insertAdjacentHTML('afterbegin', html);













}

function playSound() {
    const som = document.getElementById("sound")
    som.play();
}
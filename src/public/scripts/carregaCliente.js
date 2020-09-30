var select = document.getElementById('telephone')
let selectCardapio = document.getElementById('selectClassCardapio')
let btnPesquisar = document.getElementById('pesquisarClasses')
let itensCardapio = document.getElementById('itensDoCardapio')
let clientCarrinho = document.getElementById('clientCarrinho')
let btnEnviarClient = document.getElementById('enviarClient')
let btnEnviarCarrinho = document.getElementById('enviaraoCarrinho')
let obsClienteCaixa = document.getElementById('obsClienteCaixa')
let itensNoCarrinho = document.getElementById('itensNoCarrinho')
let totalTaxaSub = document.getElementById('totalTaxaSub')
let btnFinalizarPedido = document.getElementById('finalizarPedidoCashier')

let dados = {
    obs: '',
    nomeCLient: '',
    telefoneClient: '',
    bairro: '',
    endereco: '',
    idUser: '',
    itens: []
}

select.addEventListener('change', e => {
    let value = select.options[select.selectedIndex].value;

    $.ajax({
        type: "POST",
        url: '/caixa/pesquisaCliente',
        data: { telephone: value },
        success: console.log('Pesquisado Com Sucesso')
    }).then((res) => {

        let result = res[0]
        $('#nomeDoCliente').val(result.name);
        $('#numeroTelefone').val(result.telephone.split('@')[0]);
        $('#neighborhood').val(result.neighborhood);
        $('#addressClient').val(result.address);
        $('#idUsuarios').val(result.id)
    })

})

btnPesquisar.addEventListener('click', async (e) => {
    let value = selectCardapio.options[selectCardapio.selectedIndex].value;
    if (!value) {
        return
    }
    await $.ajax({
        type: "POST",
        url: '/caixa/pesquisaClass',
        data: { class: value },
        success: console.log('Pesquisado Com Sucesso')
    }).then(async (res) => {

        console.log(res)
        async function getClass() {
            let options = ''
            await res.forEach(element => {
                options += `<option value="${element.id} | ${element.value} | ${element.costProduce}">${element.name} - ${element.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</option>`
            })

            return options
        }

        await getClass().then(res => produto = res.toString())
        let html = `
        <div class="row col-12">
       <div class="form-group col-8 ml-3">
       <label for="">${value.toUpperCase()}</label>
       <select name="" id="" class="form-control col-12">
           <option value="">Selecione</option>
            ${produto}
       </select>
       </div>
       <div class="form-group col-2">
       <label for="">Qtd</label>
       <input type="number" min="1" value="1" class="form-control">
       </div>
       <div class="form-group col-1 mt-2">
       <button onclick="apagaDiv(this)" class="btn btn-outline-danger mt-4" style="border-radius:5px;"><span>&#10005;</span></button>
       </div>
       </div>

     
       `

        itensCardapio.insertAdjacentHTML('afterbegin', html);



    })

})

btnEnviarClient.addEventListener('click', async e => {
    e.preventDefault()
    const nomeCLient = $('#nomeDoCliente').val();
    const telefoneClient = $('#numeroTelefone').val();
    const bairro = $('#neighborhood').val();
    const endereco = $('#addressClient').val();
    if (!nomeCLient) {
        return alert('Informe o Nome do Cliente')
    }
    if (!telefoneClient) {
        return alert('Informe o Telefone do Cliente')
    }

  await $.ajax({
        type: "POST",
        url: '/caixa/registerUser',
        data: {telephone:telefoneClient+'@c.us',name:nomeCLient,stage:'0',neighborhood:bairro,address:endereco}, 
        success: console.log('Usuario cadastrado com sucesso')
      }).then(res=>{dados.idUser=res})

    dados.nomeCLient = nomeCLient
    dados.telefoneClient = telefoneClient
    dados.bairro = bairro
    dados.endereco = endereco
    jQuery('.modal').modal('hide')
    console.log(dados)
    clientCarrinho.innerText = `Cliente: ${nomeCLient}`

})



btnEnviarCarrinho.addEventListener('click', e => {
    dados.itens = []
    $('#itensDoCardapio').find('select').each(function (index, html) {
        if (html.options[html.selectedIndex].text != "Selecione")
            quantidade = $('#itensDoCardapio').find('input')[index].value
        produto = html.options[html.selectedIndex].text
        idItem = html.options[html.selectedIndex].value
        if (quantidade == '0') {
            return alert('quantidade 0')
        }
        console.log(produto)
        dados.itens.push({ produto, quantidade, valor: quantidade * idItem.split('|')[1], idItem: idItem.split('|')[0],profit: (idItem.split('|')[1] * quantidade) - (idItem.split('|')[2] * quantidade), spent: idItem.split('|')[2] * quantidade  })
    })
    dados.obs = obsClienteCaixa.value
    console.log(dados)
    itensNoCarrinho.innerText = ''
    totalTaxaSub.innerText = ''
    let soma = 0
    dados.itens.forEach(e => {
        if (e.produto == 'Selecione') {
            return
        }
        soma += e.valor
        itensNoCarrinho.insertAdjacentHTML('beforeend', `<p class="text-center ml-5">${e.quantidade}x <strong>${e.produto}</strong></p>`);
    })
    totalTaxaSub.insertAdjacentHTML('afterbegin', `
    <h5 class="mt-1">SubTotal: ${soma.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h5>
    <h5 class="mt-1">Taxa de Entrega:</h5>
    <h3 class="mt-1">Total: ${soma.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h3>`)


})

btnFinalizarPedido.addEventListener('click', async e => {
    e.preventDefault()
    let TipoDePagamento = $('#sTipoDePagamento').val()
    let TipoEntrega = ''
    let entrega = $('#classEntrega').is(':checked')
    let retiraLocal = $('#classRetirarNoLocal').is(':checked')

    if(entrega){
        TipoEntrega= 'Entregar No Endereco'
    }if(retiraLocal){
        TipoEntrega= 'Retirar No Local'
    }
    if (!dados.nomeCLient) {
        return alert('Falta Informar o cliente!')
    }
    if (dados.itens.length == 0) {
        return alert('Falta adicionar algum produto ao carrinho!')
    }


    await dados.itens.forEach(e=>{
     $.ajax({
        type: "POST",
        url: '/caixa/submitRequest',
        data: {idUser:dados.idUser, quantity:e.quantidade,observacao: dados.obs, formaPagamento:TipoDePagamento,profit:e.profit,spent:e.spent,dadosEntrega:TipoEntrega,idItem:e.idItem }, 
        success: console.log('Item cadastrado com sucesso')
      })
})
location.reload()
    
})


function apagaDiv(e) {
    $(e).parent().parent().fadeOut(500, function () { $(e).parent().parent().remove(); })

}
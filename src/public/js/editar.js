let modalEditaPedido = document.querySelector('.modalEditaPedido')
const dinheiroReal = (valor) => valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

function editar(order) {
    jQuery('#modalEditClient').modal();
    modalEditaPedido.innerHTML = ''
    $.ajax({
        type: "POST",
        url: '/editar/pedido',
        data: { order },
        success: function (value) {
            console.log(value)
            renderModal(value)

        }
    })

}

async function renderModal(value) {
    let opcoes =''
   await value.classes.forEach(e=>{
    return opcoes += ` <option value="${e.classMenu}">${e.classMenu}</option>`
    })
  
    value.result.forEach((e,index,array) => {
    
        let div = document.createElement('div')
        div.innerHTML = `<div class="d-flex">
        <div class="container">
            <hr>
            <div class="form-group col-auto">
                <label for="">TIPO</label>
                <select name="" id="selectClassCardapio" onchange="mudaopcao(this,'selectCategoria${e.id}')" class="form-control option${index}" id="fundo">
                        ${opcoes}
                </select>
                <input type="text" style="display: none;" value="${e.id}" data-toggle="modal">

            </div>
            <div class="form-group col-auto">
                <label for="">PRODUTO</label>
                <select name="" id="selectCategoria${e.id}" class="form-control col-12">
                    <option value="${e.name}">${e.name} | ${dinheiroReal(e.value)}</option>

                </select>
            </div>
            <div class="form-group col-3 mt-4 ">

                <div class="input-group mt-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Qtd</span>
                    </div>
                    <input type="number" min="1" class="form-control"
                        aria-label="Amount (to the nearest dollar)" value="1">
                    <div class="input-group-append" onclick="apagaElemento(this)">
                        <span class="input-group-text btn btn-danger" style="border-radius:3px;">X</span>
                    </div>

                </div>


            </div>
            </hr>
        </div>
    </div>`
        modalEditaPedido.appendChild(div);
        document.querySelector(`.option${index}`).value = e.class;

    })
}


async function adicionarElemento(e) {
    //editar Value modalEditaPedido
    let value = 'PIZZA';
    if (!value) {
        return
    }
    await $.ajax({
        type: "POST",
        url: '/caixa/pesquisaClass',
        data: { class: value },
        success: console.log('Pesquisado Com Sucesso')
    }).then(async (res) => {

        async function getClass() {
            let options = ''
            await res.forEach(element => {
                options += `<option value="${element.id} | ${element.value} | ${element.costProduce}">${element.name} - ${element.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</option>`
            })

            return options
        }

        await getClass().then(res => produto = res)

        let div = document.createElement('div')
        div.innerHTML = `
        <div class="d-flex">
        <div class="container">
            <hr>
            <div class="form-group col-auto">
                <label for="">Selecione uma Classe</label>
                <select name="" id="selectClassCardapio" class="form-control" id="fundo">
                    <option value="class">Promocoes </option>
                </select>
            </div>
            <div class="form-group col-auto">
                <label for="">Selecione um Produto</label>
                <select name="" id="" class="form-control col-12">
                    ${produto}
                </select>
            </div>
            <div class="form-group col-3 mt-4 ">

                <div class="input-group mt-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Qtd</span>
                    </div>
                    <input type="number" min="1" class="form-control"
                        aria-label="Amount (to the nearest dollar)" value="1">
                    <div class="input-group-append" onclick="apagaElemento(this)">
                        <span class="input-group-text btn btn-danger" style="border-radius:3px;">X</span>
                    </div>

                </div>


            </div>
            </hr>
        </div>
    </div>`

      modalEditaPedido.appendChild(div);


    })

}


function apagaElemento(e) {
    $(e).parent().parent().parent().parent().fadeOut(500, function () { $(e).parent().parent().parent().parent().remove(); })
}

async function mudaopcao(value1,value){
    document.getElementById(value).innerText = ''
    await $.ajax({
        type: "POST",
        url: '/caixa/pesquisaClass',
        data: { class:  $(value1).val() },
        success: function (res){
            res.forEach(e=>{
                $(`#${value}`).append(`<option value="${e.name}">${e.name} | ${dinheiroReal(e.value)}</option>`);
            })
        }
    })
   
}
let modalEditaPedido = document.querySelector('.modalEditaPedido')

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

/*
let res = [{address="MANOEL INACIO MACIEL",
classs = "PROMOCOES",
createdAt= "2020-10-13T12:37:27.000Z",
delivery= 0,
deliveryType= "Entregar No Endereco",
desc= "",
formPayment= "",
id=41,
name= "X-tudo",
neighborhood= "",
nome= "MATHEUS MENDES REZENDE",
note="",
orderRequest= "6eiui7ies",
profit=8,
quantity= 1,
spent=2,
status="Pendente",
telephone="35988798846@c.us",
trocoPara= "",
updatedAt= "2020-10-13T12:37:27.000Z",
value= 10}]
*/
async function renderModal(res) {
   
    res.forEach(e => {
        let div = document.createElement('div')

        div.innerHTML = `<div class="d-flex">
        <div class="container">
            <hr>
            <div class="form-group col-auto">
                <label for="">Selecione uma Classe</label>
                <select name="" id="selectClassCardapio" class="form-control" id="fundo">

                    <option value="class">Promocoes </option>
                    <option value="class">maiuscula </option>
                    <option value="class">maiuscula </option>
                </select>
            </div>
            <div class="form-group col-auto">
                <label for="">Selecione um Produto</label>
                <select name="" id="" class="form-control col-12">
                    <option value="">Xtudo</option>

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


async function adicionarElemento(e) {
    //editar Value modalEditaPedido
    let value = 'PROMOCOES';
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

        await getClass().then(res => produto = console.log(res))

        let html = `<div class="d-flex">
        <div class="container">
            <hr>
            <div class="form-group col-auto">
                <label for="">Selecione uma Classe</label>
                <select name="" id="selectClassCardapio" class="form-control" id="fundo">

                    <option value="class">Promocoes </option>
                    <option value="class">maiuscula </option>
                    <option value="class">maiuscula </option>
                </select>
            </div>
            <div class="form-group col-auto">
                <label for="">Selecione um Produto</label>
                <select name="" id="" class="form-control col-12">
                    <option value="">Xtudo</option>

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

        modalEditaPedido.insertAdjacentHTML('afterend', html);

    })

}


function apagaElemento(e) {
    $(e).parent().parent().parent().parent().fadeOut(500, function () { $(e).parent().parent().parent().parent().remove(); })

}
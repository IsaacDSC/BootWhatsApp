var select = document.getElementById('telephone')
let selectCardapio = document.getElementById('selectClassCardapio')
let btnPesquisar = document.getElementById('pesquisarClasses')
let itensCardapio = document.getElementById('itensDoCardapio')

select.addEventListener('change', e => {
    let value = select.options[select.selectedIndex].value;

    $.ajax({
        type: "POST",
        url: 'http://localhost:3001/caixa/pesquisaCliente',
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

btnPesquisar.addEventListener('click', async(e) => {
    let value = selectCardapio.options[selectCardapio.selectedIndex].value;
    if(!value){
        return
    }
   await $.ajax({
        type: "POST",
        url: 'http://localhost:3001/caixa/pesquisaClass',
        data: { class: value },
        success: console.log('Pesquisado Com Sucesso')
    }).then(async(res)=>{
        
        console.log(res)
        async function getClass(){
            let options = ''
            await res.forEach(element => {
                
                options+= `<option value=${element.id}>${element.name} - ${element.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</option>`
            })

            return options
        }
     
    await getClass().then(res=>produto= res.toString())
        let html =`
       <div class="form-group col-6">
       <label for="">${value.toUpperCase()}</label>
       <select name="" id="" class="form-control">
           <option value="">Selecione</option>
            ${produto}
       </select>
       </div>
       <div class="form-group col-2">
       <label for="">Qtd</label>
       <input type="text" name="" id="" class="form-control">
       </div>`

       itensCardapio.insertAdjacentHTML('afterbegin', html);
    
    
    
    })






   console.log(value)

})

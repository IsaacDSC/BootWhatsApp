var select = document.getElementById('telephone')

select.addEventListener('change',e=>{
    var value = select.options[select.selectedIndex].value;
    
    $.ajax({
        type: "POST",
        url: 'http://localhost:3001/caixa/pesquisaCliente',
        data: { telephone:value},
        success: console.log('Pesquisado Com Sucesso')
    }).then((res) =>{
        console.log(res)
    let result = res[0]
    $('#nomeDoCliente').val(result.name);
    $('#numeroTelefone').val(result.telephone);
    $('#neighborhood').val(result.neighborhood);
    $('#addressClient').val(result.address);
    })

})
	
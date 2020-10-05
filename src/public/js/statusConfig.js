let desc = document.querySelector('#descricaoProduto')
let ConfigBairro = document.querySelector('#configBairro')
let configClas = document.querySelector('#confiClass')

configClas.addEventListener('change', e => {
    if (configClas.checked) {
        $.ajax({
            type: "POST",
            url: '/config/setConfig',
            data: { classMenu: 'true' },
            success: console.log('Alterado com sucesso')
    })

    } else {
        $.ajax({
            type: "POST",
            url: '/config/setConfig',
            data: { classMenu: 'false' },
            success: console.log('Alterado com sucesso')
    })

    }
})


desc.addEventListener('change', e => {
    if (desc.checked) {
        $.ajax({
            type: "POST",
            url: '/config/setConfig',
            data: { description: 'true' },
            success: console.log('Alterado com sucesso')
    })

    } else {
        $.ajax({
            type: "POST",
            url: '/config/setConfig',
            data: { description: 'false' },
            success: console.log('Alterado com sucesso')
    })

    }
})






ConfigBairro.addEventListener('change', e => {
    console.log(ConfigBairro.checked)
        if (ConfigBairro.checked) {
            $.ajax({
                type: "POST",
                url: '/config/setConfig',
                data: { neighborhood: 'true' },
                success: console.log('Alterado com sucesso')
        })

        } else {
            $.ajax({
                type: "POST",
                url: '/config/setConfig',
                data: { neighborhood: 'false' },
                success: console.log('Alterado com sucesso')
        })

        }
})



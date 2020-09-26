import { config } from '../../database/ConfigGerais'


function statusConfig() {
    var desc = document.querySelector('#desc')
    var ConfigBairro = document.querySelector('#configBairro')

    desc.addEventListener('change', e => {
        if (desc.checked) {
            config.InsertConfigGerais(ok)
        } else {

        }
    })
}

statusConfig()
require('module-alias/register')
const Config = require('@models/Config')

async function configGerais() {
    Config.sync({ force: true }).then(() => {
        console.log('\nCriado Banco de dados\n')
        InsertConfigGerais()
    })
}

async function InsertConfigGerais(bairro, desc, classMenu) {
    await Config.create({
        neighborhood: bairro,
        description: desc,
        classMenu: classMenu
    }).then(() => {
        console.log('ok')
    }).catch((err) => {
        console.log(err)
    })

}

configGerais()

exports.configGerais = configGerais
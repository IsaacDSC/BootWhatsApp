require('module-alias/register')
const Config = require('@models/Config')

async function configGerais() {
    Config.sync({ force: true }).then(() => {
        console.log('\nCriado Banco de dados\n')
        InsertConfigGerais()
    })
}

async function InsertConfigGerais() {
    await Config.create({
        neighborhood: 'false',
        description: 'false',
        classMenu: 'false'
    }).then(() => {
        console.log('ok')
    }).catch((err) => {
        console.log(err)
    })

}

configGerais()

exports.configGerais = configGerais
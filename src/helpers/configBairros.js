require('module-alias/register')
const db = require('@database/configSQL')
async function configBairroAtivo() {
    let SQL = `SELECT neighborhood FROM configurations;`
    await db.connection.query(SQL, (err, result) => {
        if (err) {
            console.log(result)
        } else {
            console.log(result)
            console.log(result[0].neighborhood)
            console.log('ok')
        }
        if (result[0].neighborhood == 'false' || result[0].neighborhood == null) {
            console.log('opção desativada')
            escolhaBairroAtivo = false
        } else {
            console.log('opção ativada')
            escolhaBairroAtivo = true
        }
    })
}

exports.configBairroAtivo = configBairroAtivo
require('module-alias/register')
const db = require('@database/configSQL')

async function getBairro() {
    let message = 'Escolha o Bairro de Entrega \n\n'
    let SQL = 'SELECT neighborhoods FROM deliveries'
    await db.connection.query(SQL, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            result.forEach((e, i) => {
                //console.log(element.neighborhoods)
                let bairros = e.neighborhoods
                return message += `*[ ${i+1} ]* ${bairros.toUpperCase()}\n`
            });
        }
    })



}



module.exports = {
    getBairro: getBairro,
}
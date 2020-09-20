require('module-alias/register')
const Delivery = require('@models/RoteDelivery')
const db = require('@database/configSQL')
const escolha = require('@data/escolha')
const $ = require('@helpers/formataReal')

async function getBairro(user) {
    escolha.db[user].escolha = []
    let bairro = 'Escolha o Bairro de Entrega \n\n';
    //Cardapio Obtido Do Banco de Dados só Obtem as classes
    const delivery = await Delivery.findAll({
        attributes: ['neighborhoods', 'cost']
    })
    delivery.forEach((e, i, elemento) => {
            escolha.db[user].escolha.push({ 'idBairro': i + 1, 'bairro': e.neighborhoods, 'custo': e.cost, 'qtdBairros': elemento.length })
            return bairro += `*[ ${i+1} ]* ${e.neighborhoods.toUpperCase()} *${$.dinheiroReal(e.cost)}*\n`
        })
        //console.log(bairro)


    return bairro
}


// function getCostBairro() {
//     //`SELECT COUNT(status) as status FROM menu_requests ;`
//     let sql = 'SELECT cost FROM deliveries;'
//     db.connection.query(sql, (err, result) => {
//         result.forEach((e, i) => {
//             console.log(e.cost)
//         })
//     })
// }

// getCostBairro()

exports.getBairro = getBairro
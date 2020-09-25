require('module-alias/register')
const db = require('@database/configSQL')
const JSON = require('@config/json')

function GraficoLucros() {
    const id = Math.random().toString(32).substr(2, 9)
    let SQL_atendimento = `SELECT COUNT(distinct  orderRequest) as orders FROM requests;`
    db.connection.query(SQL_atendimento, (err, result) => {
        let currentContent = JSON.readFile()
        currentContent.push({ id: id, QtdAtendimento: result.length })
        JSON.writeFile(currentContent)
        return result
    })
}

function status() {
    const id = Math.random().toString(32).substr(2, 9)
    let SQL_Preparando = `SELECT status FROM requests WHERE status = 'Preparando';`
    db.connection.query(SQL_Preparando, (err, results) => {
        console.log(results.length)

        let currentContent = JSON.readFile()
        currentContent.push({ id: id, statusPreparando: results.length })
        JSON.writeFile(currentContent)
    })
    let SQL_aCaminho = `SELECT status FROM requests WHERE status = 'A Caminho';`
    db.connection.query(SQL_aCaminho, (err, results) => {
        console.log(results.length)
        let currentContent = JSON.readFile()
        currentContent.push({ id: id, statusa_aCaminho: results.length })
        JSON.writeFile(currentContent)
    })
    let SQL_Entregue = `SELECT status FROM requests WHERE status = 'Entregue';`
    db.connection.query(SQL_Entregue, (err, results) => {
        console.log(results.length)
        let currentContent = JSON.readFile()
        currentContent.push({ id: id, statusEntregue: results.length })
        JSON.writeFile(currentContent)
    })
    let SQL_Cancelado = `SELECT status FROM requests WHERE status = 'Cancelado';`
    db.connection.query(SQL_Cancelado, (err, results) => {
        console.log(results.length)
        let currentContent = JSON.readFile()
        currentContent.push({ id: id, statusCancelado: results.length })
        JSON.writeFile(currentContent)
    })
}

function clients() {
    const id = Math.random().toString(32).substr(2, 9)
    let SQL = `SELECT id FROM users;`
    db.connection.query(SQL, (err, results) => {
        console.log(results.length)
        let currentContent = JSON.readFile()
        currentContent.push({ id: id, statusCancelado: results.length })
        JSON.writeFile(currentContent)
    })
}



exports.GraficoLucros = GraficoLucros
exports.clients = clients
exports.status = status
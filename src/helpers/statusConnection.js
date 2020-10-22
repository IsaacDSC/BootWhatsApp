const db = require('../database/configSQL')

function sendStatus(status){
    let SQL = `UPDATE admins SET statusConnection = '${status}' WHERE (id = 1);`
    db.connection.query(SQL, (err, result)=>{
        if(err){
            console.log('erro ao enviar statusConnection: '+result)
        }else{
            console.log('Success send status Connection')
        }
    })
}



exports.sendStatus = sendStatus

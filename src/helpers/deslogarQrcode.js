const fs = require('fs')
const { promisify } = require('util');
const unlink = promisify(fs.unlink);


async function deslogar(){
    try {
        await Promise.all([unlink('./session.data.json')])
            console.log('\n\n Excluido Session QRcode')
        } catch (err) {
            console.log(err)
        }
}
exports.deslogar = deslogar
require('module-alias/register')
const banco = require('@data/user/user')

function execute(user, msg) {
    banco.db[user].stage = 0
    return ["Obrigado pela Preferência!", "Aguarde seu pedido, em breve será entregue!", "Para mais Informações Ligue para 988180688"]
}

exports.execute = execute
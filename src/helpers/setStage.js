require('module-alias/register')
const User = require('@models/Users')

async function envStageDb(user, estagio) {
    await User.findOne({ where: { telephone: user } }).then((usuario) => {
        usuario.stage = estagio,
            usuario.save().then(() => {
                console.log('cadastrado estágio')
            }).catch((err) => {
                console.log('erro ao cadastrar estagio ' + err)
            })
    })
}



exports.envStageDb = envStageDb
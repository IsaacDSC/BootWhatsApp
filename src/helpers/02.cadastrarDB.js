require('module-alias/register')
const Request = require('@models/Requests')
const User = require('@models/Users')


async function EnvAddressDb(user, endereco) {
    console.log(user + '\n' + endereco)
    await User.findAll({ where: { telephone: user } }).then((usuarios) => {
        for (let usuario of usuarios) {
            console.log(usuario.address)
            usuario.address = endereco
            usuario.save().then(() => {
                console.log('salvo')
            }).catch((err) => {
                console.log(err)
            })
        }
    })
}

//EnvAddressDb('5524988094891@c.us', 'Barra mansa 200')

async function EnvPaymentNote(user, observacao, formaPagamento) {
    await User.findAll({ where: { telephone: user } }).then((ids) => {
        for (let id of ids) {
            Request.findAll({ where: { UserId: id.id } }).then((PayNotes) => {
                console.log(PayNotes)
                for (let PayNote of PayNotes) {
                    PayNote.note = observacao,
                        PayNote.formPayment = formaPagamento,
                        PayNote.save().then(() => {
                            console.log('Observação e forma de pagamento salva no banco')
                        }).catch((err) => {
                            console.log(err)
                        })
                }
            })
        }
    })
}
//EnvPaymentNote('5524988094891@c.us', 'sem milho os x-tudo', 'dinheiro')



module.exports = {
    EnvAddressDb: EnvAddressDb,
    EnvPaymentNote: EnvPaymentNote
}
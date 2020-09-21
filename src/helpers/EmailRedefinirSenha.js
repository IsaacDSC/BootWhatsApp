require('module-alias/register')
const nodemailer = require('@config/email')

function RedefinirSenha(emailRedefinicao, senhaRedefinicao) {
    nodemailer.transporter.sendMail({
        from: 'developing solutions <developingsolutionsTech@gmail.com>',
        to: `${emailRedefinicao}`,
        subject: 'Redefinição de Senha - Developing Solutions Tech',
        text: '',
        html: `Senha de Redefinição: ${senhaRedefinicao} <br><a href="https://10.0.0.122/reset">Aperte neste Link Para Redefinir a Senha</a>`

    }).then((message) => {
        console.log(message)
    }).catch((err) => {
        console.log(err)
    })

}


exports.RedefinirSenha = RedefinirSenha
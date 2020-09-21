require('module-alias/register')
const nodemailer = require('@config/email')

function ChamadoSuporteTech(subject, motivo) {
    nodemailer.transporter.sendMail({
        from: 'nome do cliente <email.client@gmail.com>',
        to: `developingsolutionsTech@gmail.com`,
        subject: subject,
        text: '',
        html: `<br><a href="/paginaInicial">${motivo}</a>`
    }).then((message) => {
        console.log(message)
    }).catch((err) => {
        console.log(err)
    })

}

exports.ChamadoSuporteTech = ChamadoSuporteTech
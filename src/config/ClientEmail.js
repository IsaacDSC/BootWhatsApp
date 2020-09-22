const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'emailclient@hoptmail.com',
        pass: 'senha cliente'
    }
})




module.exports = transporter
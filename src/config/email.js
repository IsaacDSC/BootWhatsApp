const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'developingsolutionsTech@gmail.com',
        pass: 'secret(!@#)'
    }
})




module.exports = transporter
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: 'food-trade-business@outlook.com',
        pass: 'secret(!@#)'
    }
})




exports.transporter = transporter
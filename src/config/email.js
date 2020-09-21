const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: 'aasdasd@outlook.com',
        pass: 'secret(!@#)'
    }
})

transporter.sendMail({
    from: 'food trade business <food-trade-business@outlook.com>',
    to: 'isaacdsc10@gmail.com',
    subject: id + '' + name,
    text: desc,
    html: `${desc} <br><a href="https://www.google.com/search?q=google&rlz=1C1GCEB_enBR891BR891&oq=goog&aqs=chrome.0.69i59j69i57j69i59j69i60l2j69i65l3.471j0j7&sourceid=chrome&ie=UTF-8">${code}</a>`

}).then((message) => {
    console.log(message)
}).catch((err) => {
    console.log(err)
})
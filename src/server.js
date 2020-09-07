//File System para salvar o Qr Code
require('module-alias/register')
const fs = require('fs');
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const venom = require('venom-bot');
const session = require('express-session')
const passport = require('passport')
const flash = require('express-flash')
require('./config/Auhenticated')(passport)

const VerifyUsers = require('./helpers/VerifyUsers')

const banco = require('@data/user/user') //arquivo que contem o USER e o stagio que ele se encontra
const stages = require('@data/stages') //arquivo com a desc e o apontamento para os arquivo de messages seguindo por stagios
const cardapio = require('@data/cardapio/cardapio')

const routes = require('@routes/routes')
const menu = require("@routes/menu")
const clients = require('@routes/clients');
const msg = require('@routes/msg')
const { sync } = require('./database/index');
const User = require('@models/Users');


//Config handlebars
app.engine('hbs', hbs({ defaultLayout: 'main.hbs', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "/views/")) //resolvendo problema, direcionando views para dentro de src
    //consfig BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
    //config pasta Public
app.use(express.static(path.join(__dirname, 'public')))
    //config session
app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }))
    //config passport
app.use(passport.initialize())
app.use(passport.session())
    //config Flahs
app.use(flash())
    //config midleware flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.message = req.flash('message')
    res.locals.error = req.flash('error')
    next()
})

function main() {
    venom.create('Delivery', (base64Qr, asciiQR) => {
        // Mostra o Qr Code no Terminal
        console.log(asciiQR);

        // Cria o arquivo png
        exportQR(base64Qr, 'public/images/qrCode.png');
    }).then((client) => start(client));

    function exportQR(qrCode, path) {
        qrCode = qrCode.replace('data:image/png;base64,', '');
        const imageBuffer = Buffer.from(qrCode, 'base64');
        fs.writeFileSync(path, imageBuffer);
    }

    function start(client) {
        client.onMessage(async(message) => {            
            const user = await User.findAll({ where: { telephone: message.sender.id } })
            console.log(user.length)
            if (user.length === 0) {
                try {
                    let resposta = stages.step[getStage(message.from)].obj.execute(
                        message.from, 
                        message.body,
                        message.sender.name
                        )
                    for (let i = 0; i < resposta.length; i++) {
                        const element = resposta[i]
                        client.sendText(message.from, element)
                    }
                    User.create({
                        telephone: message.sender.id,
                        name: message.sender.pushname,
                        photograph: message.sender.profilePicThumbObj.img,
                        stage: 0
                    })
                } catch (error) {
                    console.log(error)
                }

            } else {
                let resposta = await stages.step[getStage(message.from)].obj.execute(message.from, message.body,message.sender.name)
                for (let i = 0; i < resposta.length; i++) {
                    const element = resposta[i]
                    client.sendText(message.from, element)
                }
                console.log('cadastrado')

            }

        });
    }
}




function getStage(user) {
    return banco.db[user].stage
}

main()

/* console.log(stages.step[getStage('user1')].obj.execute())
console.log(stages.step[getStage('user2')].obj.execute()) */

app.use(routes)
app.use(menu)
app.use(clients)
app.use('/msg', msg)


const port = 3000
app.listen(process.env.PORT || port, () => {
    console.log(`http://127.0.0.1:${port}`)
    console.log('Break Server CTRL + C')
})
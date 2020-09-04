require('module-alias/register')
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const venom = require('venom-bot');
const session = require('express-session')
const routes = require('@routes/routes')
const menu = require("@routes/menu")
const passport = require('passport')
const flash = require('express-flash')
require('./config/Auhenticated')(passport)

const banco = require('@data/user/user') //arquivo que contem o USER e o stagio que ele se encontra
const stages = require('@data/stages') //arquivo com a desc e o apontamento para os arquivo de messages seguindo por stagios
const cardapio = require('@data/cardapio/cardapio')

const Users = require('@models/Users')



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



venom.create().then((client) => start(client));

function start(client) {
    client.onMessage((message) => {
        //console.log(message)
        //Verificar se existe
        //cadastrar usuario ao Bando Users
        Users.findOne({ where: { telephone: message.sender.id } }).then((user) => {
            if (user) {
                console.log('\n\n\ncliente encontrado\n\n\n')
                let resposta = stages.step[getStage(message.from)].obj.execute(message.from, message.body)
                for (let i = 0; i < resposta.length; i++) {
                    const element = resposta[i]
                    client.sendText(message.from, element)
                }
            } else {
                console.log('\n\n\ncliente não encontrado\n\n\n')
                Users.create({
                    telephone: message.sender.id,
                    name: message.sender.pushname,
                    photograph: message.sender.profilePicThumbObj.img
                }).then(() => {
                    console.log('cliente salvo no banco de dados')
                    let resposta = stages.step[getStage(message.from)].obj.execute(message.from, message.body)
                    for (let i = 0; i < resposta.length; i++) {
                        const element = resposta[i]
                        client.sendText(message.from, element)
                    }
                }).catch((err) => {
                    console.log('Erro ao adicionar ao banco de dados ' + err)
                })
            }
        })
    });
}



/* function getStage(user) {
    return banco.db[user].stage
} */

/* console.log(stages.step[getStage('user1')].obj.execute())
console.log(stages.step[getStage('user2')].obj.execute()) */

app.use(routes)
app.use(menu)

const Port = 3000
app.listen(Port, () => {
    console.log(`http://10.0.0.122`)
    console.log('Break Server CTRL + C')
})
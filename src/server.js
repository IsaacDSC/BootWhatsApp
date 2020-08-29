require('module-alias/register')
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

const venom = require('venom-bot');
const banco = require('@data/user/user') //arquivo que contem o USER e o stagio que ele se encontra
const stages = require('@data/stages') //arquivo com a desc e o apontamento para os arquivo de messages seguindo por stagios
const cardapio = require('@data/cardapio/cardapio')

const routes = require('@routes/routes')

app.engine('hbs', hbs({ defaultLayout: 'main.hbs', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "/views/")) //resolvendo problema, direcionando views para dentro de src

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


/* venom.create().then((client) => start(client));

function start(client) {
    client.onMessage((message) => {
        let resposta = stages.step[getStage(message.from)].obj.execute(message.from, message.body)
        for (let i = 0; i < resposta.length; i++) {
            const element = resposta[i]
            client.sendText(message.from, element)
        }
    });
} */



function getStage(user) {
    return banco.db[user].stage
}

/* console.log(stages.step[getStage('user1')].obj.execute())
console.log(stages.step[getStage('user2')].obj.execute()) */

app.use(routes)

const Port = 3000
app.listen(Port, () => {
    console.log(`http://10.0.0.122`)
    console.log('Break Server CTRL + C')
})
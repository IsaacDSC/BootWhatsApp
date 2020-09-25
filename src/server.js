//File System para salvar o Qr Code
require('module-alias/register')
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const flash = require('express-flash')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
require('./config/Auhenticated')(passport)


//consfigurando rotas
const clients = require('@routes/clients');
const lucro = require('@routes/lucro');
const config = require('@routes/config')
const menu = require("@routes/menu")
const msg = require('@routes/msg')
const reset = require('@routes/reset')
const routes = require('@routes/routes')
const suporteTecnico = require('@routes/suporteTecnico')
const dados = require('@routes/dados')


//Inicia O client
//client()
//Para o Client
//stopClient()



//socketio
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //The ionic server
    next();
});

io.on('connection', function (socket) {
    console.log('Usuario Conectado ' + socket.id)
    //Broadcast envia para todos os clientes
    //emit para apenas 1
})

function enviaParaFrontend(dados = '') {
    io.emit('PedidoConcluido', dados)
}


//Config handlebars
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    extname: 'hbs',
    helpers: {

        trataTelephone: function (value) {
            return value.split('@')[0]
        },

        maiuscula: function (value) {
            return value.toUpperCase()
        },
        dinheiro: function (value) {
            if (value) {
                return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            }
            return
        },
        multiplica: function (value1, value2) {
            if (value1) {
                return (value1 * value2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            }
            return
        },
        preparando: function (value) {
            return value == 'Preparando' || value == 'Saiu para Entrega' || value == 'Entregue'
        },
        saiuParaEntrega: function (value) {
            return value == 'Saiu para Entrega' || value == 'Entregue'
        },
        entregue: function (value) {
            return value == 'Entregue'
        }


    }
}));
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



app.use(routes)
app.use(menu)
app.use(clients)
app.use(lucro)
app.use('/msg', msg)
app.use('/config', config)
app.use(reset)
app.use('/suporteTecnico', suporteTecnico)
app.use('/dados', dados)

const port = process.env.PORT || 3001
server.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
    console.log('Break Server CTRL + C')
})

exports.enviaParaFrontend = enviaParaFrontend
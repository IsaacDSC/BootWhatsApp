//File System para salvar o Qr Code
require('module-alias/register')
require('dotenv').config()

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
const config = require('@routes/config')
const menu = require("@routes/menu")
const msg = require('@routes/msg')
const reset = require('@routes/reset')
const routes = require('@routes/routes')
const suporteTecnico = require('@routes/suporteTecnico')
const grapichs = require('@routes/grapichs')
const cashier = require('@routes/cashier')
const profile = require('@routes/profile.js')
const login = require('@routes/login')
const delivery = require('@routes/delivery')
const payment = require('@routes/payment')
const editarPedido = require('@routes/editarPedido')
const pedidos = require('@routes/pedidos')
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

function NovoClienteAtendimento(dados) {
    io.emit('NovoClienteAtendimento', dados)
}


//Config handlebars
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    extname: 'hbs',
    helpers: {

        trataTelephone: function (value) {
            if (!value) { return }
            return value.split('@')[0]
        },

        maiuscula: function (value) {
            return value.toUpperCase()
        },
        dinheiro: function (value) {
            if (value) {
                return Number(value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            }
            return
        },
        somaDinheiro: function (value1, value2) {
            if (value1) {
                return (value1 + value2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
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
        },
        trataHora: function (value) {
            const formataHora = (Hora) => Hora < 10 ? '0' + Hora : Hora
            let data = new Date(value)
            return `${formataHora(data.getHours())}:${formataHora(data.getMinutes())}`
        },
        trataData: function (value) {
            const formataHora = (Hora) => Hora < 10 ? '0' + Hora : Hora
            let data = new Date(value)
            dia = data.getDate()
            mes = data.getMonth()
            ano = data.getFullYear()
            return `${formataHora(dia)}/${formataHora(mes + 1)}/${ano}`
        },
        valorTrue: function (value) {
            return value == 'true'
        },
        meseAno: function () {
            let data = new Date()
            const mes = [
                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
                "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
            ]

            return `${mes[data.getMonth()]} ${data.getFullYear()}`
        },
        somaPedidos: function (value,value2) {
            soma = 0
            value.forEach(e => {
                soma += Number(e.value) * Number(e.quantity)
            });
            if(Number(value2)){
                return (soma+value2).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            }
            return (soma).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })




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
app.use('/msg', msg)
app.use('/config', config)
app.use(reset)
app.use('/suporteTecnico', suporteTecnico)
app.use('/dados', grapichs)
app.use('/caixa', cashier)
app.use('/pay', payment)
app.use('/profile', profile)
app.use(login)
app.use('/delivery', delivery)
app.use(editarPedido)
app.use(pedidos)
const port = process.env.PORT_APLICATION || process.env.PORT
server.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
    console.log('Break Server CTRL + C')
})

exports.NovoClienteAtendimento = NovoClienteAtendimento
exports.enviaParaFrontend = enviaParaFrontend
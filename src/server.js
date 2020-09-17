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
const {client,stopClient,venom_client} = require('@config/bot') 
const routes = require('@routes/routes')
const menu = require("@routes/menu")
const clients = require('@routes/clients');
const msg = require('@routes/msg')
const config = require('@routes/config')


    
//Inicia O client
client()
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
app.engine('hbs', hbs({ defaultLayout: 'main.hbs', extname: 'hbs' ,helpers:{

    trataTelephone: function(value){
        return value.split('@')[0]
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

///local para chamar a configuração do bot
//boot.main()

app.use(routes)
app.use(menu)
app.use(clients)
app.use('/msg', msg)
app.use('/config', config)


const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
    console.log('Break Server CTRL + C')
})

exports.enviaParaFrontend = enviaParaFrontend
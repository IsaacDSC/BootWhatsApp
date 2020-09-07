//File System para salvar o Qr Code
require('module-alias/register')
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const boot = require('@config/bot')
const session = require('express-session')
const passport = require('passport')
const flash = require('express-flash')
require('./config/Auhenticated')(passport)



const routes = require('@routes/routes')
const menu = require("@routes/menu")
const clients = require('@routes/clients');
const msg = require('@routes/msg')

const { sync } = require('./database/index');




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


///local para chamar a configuração do bot
boot.main()






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
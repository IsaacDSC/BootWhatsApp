require('module-alias/register')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const { auth } = require('@helpers/auth')
const Requests = require('@models/Requests')
const User = require('@models/Users')
const Menu = require('@models/Menu')
const db = require('@database/configSQL')
const RegisterUsers = require('@models/RegistersUsers')
const email = require('../helpers/EmailRedefinirSenha')
const { client, stopClient, sendText } = require('@config/bot')



router.get('/', auth, async(req, res) => {
    let sql = `SELECT users.name as nome, users.telephone, users.neighborhood, users.address, menus.name, menus.class, menus.desc, menus.value, requests.id, requests.quantity, requests.note, requests.delivery, requests.formPayment,requests.deliveryType, requests.profit, requests.spent, requests.status, requests.createdAt, requests.updatedAt FROM relacionamentos join users on(relacionamentos.UserId = users.id) join menus on( relacionamentos.MenuId = menus.id) join requests on (relacionamentos.PedidosId = requests.id) where status = 'Pendente' OR status = 'Preparando' OR status= 'Saiu para Entrega';`
    let countRequest = `SELECT COUNT(distinct  UserId) as createdAt FROM relacionamentos  WHERE DATE(createdAt) = DATE(NOW());`
    let countPreparo = `SELECT COUNT(distinct  IdUsuario) as createdAt FROM requests  WHERE DATE(createdAt) = DATE(NOW()) and status='Preparando';`
    let profitSpent = `SELECT sum(requests.profit) as profit, sum(requests.spent) as spent FROM relacionamentos  join users on(relacionamentos.UserId = users.id) join menus on( relacionamentos.MenuId = menus.id) join requests on (relacionamentos.PedidosId = requests.id) WHERE DATE(requests.createdAt) = DATE(NOW()) and status !='Cancelado';`
    let countEntregue = `SELECT COUNT(distinct  IdUsuario) as createdAt FROM requests  WHERE DATE(createdAt) = DATE(NOW()) and status='Entregue';`
    let countCancelado = `SELECT COUNT(distinct  IdUsuario) as createdAt FROM requests  WHERE DATE(createdAt) = DATE(NOW()) and status='Cancelado';`
    let emAtendimento = `select count(stage) as stage from users where stage !='14'`
    let admin = `select name, email from admins;`
    db.connection.query(sql, (err, result) => {
        var saida = [];

        for (var i = 0; i < result.length; i++) {

            var telehpneIgual = false;

            for (var j = 0; j < i; j++) {
                if (saida[j] && result[i].telephone == saida[j].telephone) {
                    saida[j].pedidos.push({
                        nome: result[i].name,
                        class: result[i].class,
                        value: result[i].value,
                        id: result[i].id,
                        profit: result[i].profit,
                        spent: result[i].spent,
                        quantity: result[i].quantity,
                        note: result[i].note,

                    })
                    telehpneIgual = true;
                    break;
                }
            }

            if (!telehpneIgual) {
                saida.push({
                    telephone: result[i].telephone,
                    nome: result[i].nome,
                    neighborhood: result[i].neighborhood,
                    address: result[i].address,
                    delivery: result[i].delivery,
                    status: result[i].status,
                    formPayment: result[i].formPayment,
                    total: result[i].profit + result[i].spent,
                    deliveryType: result[i].deliveryType,
                    createdAt: result[i].createdAt,
                    pedidos: [{
                        nome: result[i].name,
                        class: result[i].class,
                        value: result[i].value,
                        id: result[i].id,
                        profit: result[i].profit,
                        spent: result[i].spent,
                        quantity: result[i].quantity,
                        note: result[i].note,
                    }]
                })
            }
        }

        db.connection.query(countRequest, (err, countRequests) => {
            db.connection.query(countPreparo, (err, countPreparo) => {
                db.connection.query(profitSpent, (err, profitSpent) => {
                    db.connection.query(countEntregue, (err, countEntregue) => {
                        db.connection.query(countCancelado, (err, countCancelado) => {
                            db.connection.query(emAtendimento, (err, emAtendimento) => {
                                db.connection.query(admin, (err, admin) => {
                                    console.log(admin)
                                    res.render('index/index', { requests: saida, emAtendimento: emAtendimento[0].stage, countCancelado: countCancelado[0].createdAt, countEntregue: countEntregue[0].createdAt, countRequests: countRequests[0].createdAt, countPreparo: countPreparo[0].createdAt, profit: profitSpent[0].profit, spent: profitSpent[0].spent, admin: admin })
                                })
                            })
                        })
                    })
                })
            })
        })
    });


})

router.get('/qrcode', (req, res) => {
    res.render('QrCode/QrCode', { layout: 'QrCode.hbs' })
})

router.get('/profile', (req, res) => {
    res.render('profile/myProfile')
})

router.get('/login', (req, res) => {
    res.render('login/login', { layout: 'login.hbs' })
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
})


router.post('/ligabot', async(req, res) => {
    await client()
    return res.status(200).send('Bot Ligado')

})

router.post('/mandamensagem', async(req, res) => {
    try {
        let Preparo = '♨  Seu pedido está em *preparo*, assim que estiver pronto estaremos lhe avisando.\n\nObrigado.'
        let SaiuParaEntrega = '🛵  Seu pedido saiu para entrega, basta aguardar.\n\nObrigado.'
        let Entregue = 'Produto Entregue'
        let Cancelado = 'Seu Pedido foi cancelado'
        if (req.body.mensagem == 'Preparando') {
            mensagem = Preparo
        }
        if (req.body.mensagem == 'Saiu para Entrega') {
            mensagem = SaiuParaEntrega
        }
        if (req.body.mensagem == 'Entregue') {
            mensagem = Entregue
        }
        if (req.body.mensagem == 'Cancelado') {
            mensagem = Cancelado
        }
        let sql = await `UPDATE requests INNER JOIN users ON users.id = requests.idUsuario SET requests.status = '${req.body.mensagem}' WHERE telephone = '${req.body.numero}' and requests.status != 'Entregue';`
        await db.connection.query(sql, (err, result) => {
            if (err) {
                return err
            }
            console.log('Sucesso ao mandar mensagem')

        })


        await sendText(req.body.numero, mensagem)

        return res.status(200).send('Mensagem Enviada')

    } catch (error) {
        return res.status(400).send('Falha ao enviar a mensagem')
    }

})

router.post('/desligabot', async(req, res) => {
    await stopClient()
    return res.status(200).send('Bot Desligado')

})



router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'Deslogado com sucesso!')
    res.redirect('/login')
})

router.get('/register', (req, res) => {
    res.render('register/register', { layout: 'login.hbs' })
})

router.get('/register', (req, res) => {
    let businessName = req.body.businessName
    let document = req.body.document
    let name = req.body.name
    let email = req.body.email
    let telephone = req.body.telephone
    let terms = req.body.terms
    if (businessName.length == 0 || document.length == 0 || name.length == 0 || email.length == 0 || telephone.length == 0) {
        req.flash('error_msg', 'Preencha todos os campos corretamente')
        res.redirect('/register')
    }
    if (terms.length == 0) {
        req.flash('error_msg', 'Aceite os termos de contrato')
        res.redirect('/register')
    }
    if (document.length < 18 || document.length > 18) {
        req.flash('error_msg', 'Documento Inválido, Preencha novamente')
        res.redirect('/register')
    } else {
        RegisterUsers.create({
            businessName: businessName,
            document: document,
            name: name,
            email: email,
            telephone: telephone,
            terms: terms
        }).then(() => {
            req.flash('success_msg', 'Em breve entraremos em contato, muito obrigado pela preferência')
            res.redirect('/login')
        }).catch((err) => {
            req.flash('error_msg', 'Preencha os campos corretamente!')
            res.redirect('/register')
        })
    }

})

router.post('/debug', (req, res) => {
    let ORDER = Math.random().toString(32).substr(2, 9)
        //res.send(req.body.status)
    let sql = `UPDATE requests SET status = '${req.body.status}' WHERE 'id=${req.body.id}';`
    db.connection.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.redirect('/')
        }
    })
})

module.exports = router
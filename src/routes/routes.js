require('module-alias/register')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const { auth } = require('@helpers/auth')
const Requests = require('@models/Requests')
const User = require('@models/Users')
const Menu = require('@models/Menu')
const db = require('@database/configSQL')

const { client, stopClient, sendText } = require('@config/bot')


router.get('/', auth, async (req, res) => {
    let sql = `SELECT users.name as nome, users.telephone, users.neighborhood, users.address,requests.orderRequest, menus.name, menus.class, menus.desc, menus.value, requests.id,requests.trocoPara, requests.quantity, requests.note, requests.delivery, requests.formPayment,requests.deliveryType, requests.profit, requests.spent, requests.status, requests.createdAt, requests.updatedAt FROM relacionamentos join users on(relacionamentos.UserId = users.id) join menus on( relacionamentos.MenuId = menus.id) join requests on (relacionamentos.PedidosId = requests.id) where status = 'Pendente' OR status = 'Preparando' OR status= 'Saiu para Entrega';`
    let countRequest = `SELECT COUNT(distinct  UserId) as createdAt FROM relacionamentos  WHERE DATE(createdAt) = DATE(NOW());`
    let countPreparo = `SELECT COUNT(distinct  IdUsuario) as createdAt FROM requests  WHERE DATE(createdAt) = DATE(NOW()) and status='Preparando';`
    let profitSpent = `SELECT sum(requests.profit) as profit, sum(requests.spent) as spent FROM relacionamentos  join users on(relacionamentos.UserId = users.id) join menus on( relacionamentos.MenuId = menus.id) join requests on (relacionamentos.PedidosId = requests.id) WHERE DATE(requests.createdAt) = DATE(NOW()) and status !='Cancelado';`
    let countEntregue = `SELECT COUNT(distinct  IdUsuario) as createdAt FROM requests  WHERE DATE(createdAt) = DATE(NOW()) and status='Entregue';`
    let countCancelado = `SELECT COUNT(distinct  IdUsuario) as createdAt FROM requests  WHERE DATE(createdAt) = DATE(NOW()) and status='Cancelado';`
    let emAtendimento = `select count(stage) as stage from users where stage !='14' and stage !='0';`
    let admin = `select name, email from admins where id='1';`
    let boot = `select boot from configurations`
    db.connection.query(sql, (err, result) => {
        var saida = [];

        for (var i = 0; i < result.length; i++) {

            var telehpneIgual = false;
            for (var j = 0; j < i; j++) {
                if (saida[j] && result[i].orderRequest == saida[j].orderRequest) {
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
                    orderRequest: result[i].orderRequest,
                    delivery: result[i].delivery,
                    telephone: result[i].telephone,
                    trocoPara: result[i].trocoPara,
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
                                    db.connection.query(boot, (err, boot) => {
                                        res.render('index/index', { boot:boot[0].boot,requests: saida, emAtendimento: emAtendimento[0].stage, countCancelado: countCancelado[0].createdAt, countEntregue: countEntregue[0].createdAt, countRequests: countRequests[0].createdAt, countPreparo: countPreparo[0].createdAt, profit: profitSpent[0].profit, spent: profitSpent[0].spent, admin: admin })
                                    })
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

router.post('/ligabot', async (req, res) => {
    SQL = `UPDATE configurations SET boot = 'true';`
    await db.connection.query(SQL, (err, update) => { })
    await client()
    return res.status(200).send('Bot Ligado')

})

router.post('/mandamensagem', async (req, res) => {
    try {
        SQL_Entregue=`select message from messages where stage='entregue';`
        let Preparo = '♨  Seu pedido está em *preparo*, assim que estiver pronto estaremos lhe avisando.\n\nObrigado.'
        let SaiuParaEntrega = '🛵  Seu pedido saiu para entrega, basta aguardar.\n\nObrigado.'
        let Cancelado = 'Seu Pedido foi cancelado'
        await db.connection.query(SQL_Entregue, (err, result) => {
            
        
        
        if (req.body.mensagem == 'Preparando') {
            mensagem = Preparo
        }
        if (req.body.mensagem == 'Saiu para Entrega') {
            mensagem = SaiuParaEntrega
        }
        if (req.body.mensagem == 'Entregue') {
         
                mensagem = result[0].message
            
           
        }
        if (req.body.mensagem == 'Cancelado') {
            mensagem = Cancelado
        }
        let sql = `UPDATE requests INNER JOIN users ON users.id = requests.idUsuario SET requests.status = '${req.body.mensagem}' WHERE telephone = '${req.body.numero}'and  requests.orderRequest='${req.body.order}' and requests.status != 'Entregue';`
         db.connection.query(sql, (err, result) => {
            if (err) {
                return err
            }
            console.log('Sucesso ao mandar mensagem')

        })


         sendText(req.body.numero, mensagem)
   
        return res.status(200).send('Mensagem Enviada')
    
    })
    } catch (error) {
        return res.status(400).send('Falha ao enviar a mensagem')
    }

})

router.post('/desligabot', async (req, res) => {
    await stopClient()
    SQL = `UPDATE configurations SET boot = 'false';`
    await db.connection.query(SQL, (err, update) => { })

    return res.status(200).send('Bot Desligado')

})

router.post('/statusBot', async (req, res) => {

    SQL = `select boot from configurations;`
    await db.connection.query(SQL, (err, result) => { 

    return res.status(200).send(result[0].boot)
})
})


router.get('/marketing', (req, res) => {
    req.flash('error_msg', 'O plano Básico não cobre Marketing Incluso, se deseja ter uma ferramenta de marketing inclusa acesse: https://solutionstech.com.br/planos')
    res.redirect('/')
})



module.exports = router
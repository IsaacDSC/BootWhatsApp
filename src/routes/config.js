require('module-alias/register')
const express = require('express')
const router = express.Router()
const Config = require('@models/Config')
const db = require('@database/configSQL')

const Delivery = require('@models/RoteDelivery')

router.get('/', async(req, res) => {
  
    res.render('config/config')

})

router.post('/setConfig',async(req,res)=>{
    let SQL;
    if(req.body.neighborhood){
    SQL = `UPDATE configurations SET neighborhood = '${req.body.neighborhood}';`
    }
    if(req.body.description){
        SQL = `UPDATE configurations SET description = '${req.body.description}';`
    }
    if(req.body.classMenu){
        SQL = `UPDATE configurations SET classMenu = '${req.body.classMenu}';`
    }

    try {
        await db.connection.query(SQL, (err, update) => {
        })
    
        res.status(200).send('Alterado Com sucesso')
        
    } catch (error) {
        console.log('Set Bairro'+ error )

        res.status(400).send('Falha ao alterar Bairro')
    }

})

router.post('/', (req, res) => {
    console.log(req.body.class)
    let classe = req.body.class.toUpperCase()
    console.log(classe)
    Config.create({
        classMenu: classe
    }).then(() => {
        req.flash('success_msg', 'Classe Salva com Sucesso')
        res.redirect('/config')
    }).catch((err) => {
        req.flash('error_msg', "Preencha o campo corretamente")
        res.redirect('/config')
        console.log(err)
    })

})

router.get('/delivery', (req, res) => {
    res.render('config/entrega')
})

router.post('/delivery', (req, res) => {
    //res.send(req.body.tempoEspera)
    Delivery.create({
        neighborhoods: req.body.bairro,
        cost: req.body.valor,
    }).then(() => {
        req.flash('success_msg', 'Configurações sobre Entregas Salva com Sucesso')
        res.render('/config')
    }).catch((err) => {
        res.send(err)
    })
})


module.exports = router
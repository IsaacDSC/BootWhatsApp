require('module-alias/register')
const express = require('express')
const router = express.Router()
const Config = require('@models/Config')
const classMenu = require('@models/classMenu')
const db = require('@database/configSQL')
const { auth } = require('@helpers/auth')
const Delivery = require('@models/RoteDelivery')

router.get('/', async(req, res) => {
    let SQL = `SELECT * FROM configurations;`
    let SQL_class = `SELECT classMenu as class FROM classMenus;`
    await db.connection.query(SQL, (err, result) => {
        db.connection.query(SQL_class, (err, menus) => {
            res.render('config/config', { menus: menus, neighborhood: result[0].neighborhood, classMenu: result[0].classMenu, description: result[0].description, maxCompra: result[0].maxCompra })
        })
    })
})

router.post('/setConfig', auth, async(req, res) => {
    let SQL;
    if (req.body.neighborhood) {
        SQL = `UPDATE configurations SET neighborhood = '${req.body.neighborhood}';`
    }
    if (req.body.description) {
        SQL = `UPDATE configurations SET description = '${req.body.description}';`
    }
    if (req.body.classMenu) {
        SQL = `UPDATE configurations SET classMenu = '${req.body.classMenu}';`
    }

    try {
        await db.connection.query(SQL, (err, update) => {})

        res.status(200).send('Alterado Com sucesso')

    } catch (error) {
        console.log('Set Bairro' + error)

        res.status(400).send('Falha ao alterar Bairro')
    }

})

router.post('/', auth, (req, res) => {
    console.log(req.body.class)
    let classe = req.body.class.toUpperCase()
    console.log(classe)
    classMenu.create({
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

router.get('/delivery', auth, (req, res) => {
    res.render('config/entrega')
})

router.post('/delivery', auth, (req, res) => {
    //res.send(req.body.tempoEspera)
    try {
        Delivery.create({
            neighborhoods: req.body.bairro,
            cost: req.body.valor.replace(',', '.'),
        }).then(() => {
            req.flash('success_msg', 'Configurações sobre Entregas Salva com Sucesso')
            res.redirect('/config/delivery')

        }).catch((err) => {
            req.flash('error_msg', 'Erro ao cadastrar Entregas')
            res.redirect('/config/delivery')
        })

    } catch (error) {
        req.flash('error_msg', 'Erro ao cadastrar Entregas')
        res.redirect('/config/delivery')
    }

})

router.post('/maxPedidos', auth, (req, res) => {
    let sql = `SELECT maxCompra FROM configurations;`
    db.connection.query(sql, (err, result) => {
        console.log(result)
        if (result[0].maxCompra == null || result[0].maxCompra == '') {
            Config.create({
                maxCompra: req.body.number
            }).then(() => {
                req.flash('success_msg', 'Numero Máximo de Pedidos Configurado com Sucesso!')
                res.render('/config')
            }).catch((err) => {
                req.flash('error_msg', err)
                res.redirect('/config')
            })
        } else {
            Config.findOne({ id: '1' }).then((config) => {
                config.update({ maxCompra: req.body.maxCompra })
                config.save().then(() => {
                    req.flash('success_msg', 'Numero Máximo de Pedido Editado com Sucesso!')
                    res.redirect('/config')
                }).catch((err) => {
                    req.flash('error_msg', 'Erro ao Editar Numero Máximo de Pedido Editado com Sucesso!')
                    res.redirect('/config')
                })
            })
        }
    })

})



router.post('/editarClass', (req, res) => {
    let SQL_class = `SELECT classMenu as class FROM classMenus where classMenu='${req.body.class}';`
    db.connection.query(SQL_class, (err, menus) => {
   
        res.render('config/class', { nameClass: menus })
    })
})

router.post('/class', (req, res) => {
    const classe = req.body.class.toUpperCase()
    let SQL = `UPDATE menus SET class = '${classe}' WHERE class='${req.body.parametro}';`
    let SQL1 = `UPDATE classMenus SET classMenu = '${classe}' WHERE classMenu='${req.body.parametro}';`
    db.connection.query(SQL1, (err, result) => {})
    db.connection.query(SQL, (err, result) => {
        if (err) {
            req.flash('error_msg', 'Houve um Erro ao Editar a Classe')
            res.redirect('/config')
        } else {
            req.flash('success_msg', 'Classe Editada com Sucesso!')
            res.redirect('/config')
        }
    })
})




module.exports = router
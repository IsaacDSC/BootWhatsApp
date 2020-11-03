const express = require('express')
const router = express.Router()
const mercadopago = require("mercadopago");
const db = require('@database/configSQL')
const { auth } = require('@helpers/auth')


mercadopago.configure({
    sandbox: false,
    access_token: 'APP_USR-7805781539029586-101101-09c3c56a9b669a013e7239c7b24254a7-657211312',
});

const getFullUrl = (req) => {
    const url = req.protocol + '://' + req.get('host');
    return url;
}

router.post('/', auth, async(req, res) => {
    const data = new Date();
    SQL_DATA_VENCIMENTO = `select vencimento from configurations;`
    await db.connection.query(SQL_DATA_VENCIMENTO, (err, result) => {
        if (err) {
            req.flash('error_msg', 'Houve um erro no pagamento, tente novamente mais tarde'.toUpperCase())
            res.redirect('/dados/lucros')
            return
        }
        const vencimento = result[0].vencimento
        if (vencimento <= data) {
            SQL_Preco = `SELECT ROUND(count(distinct requests.orderRequest)*configurations.plano,2) as preco
  FROM requests , configurations
  WHERE requests.createdAt BETWEEN date(configurations.inicio) AND date(configurations.vencimento) and status = 'Entregue'`
            db.connection.query(SQL_Preco, (err, result) => {
                if (err) {
                    return err
                }
                preco = result[0].preco
                if (preco <= 75) {
                    preco = 75
                }
                const purchaseOrder = {
                    items: [
                        item = {
                            id: '1',
                            title: "Prestação De Serviço solutionstech",
                            description: "Pagamento Prestação De Serviço solutionstech",
                            quantity: 1,
                            currency_id: 'BRL',
                            unit_price: parseFloat(preco)
                        }
                    ],
                    auto_return: "all",
                    payment_methods: {
                        excluded_payment_types: [{
                            "id": "ticket"
                        }],
                        installments: 3
                    },
                    binary_mode: true,

                    back_urls: {
                        success: getFullUrl(req) + "/pay/success",
                        pending: getFullUrl(req) + "/pay/pending",
                        failure: getFullUrl(req) + "/pay/failure",
                    },
                }

                orderMercadoPago(purchaseOrder)

            })
        } else {
            req.flash('error_msg', 'Ainda Não esta no vencimento!'.toUpperCase())
            res.redirect('/dados/lucros')

        }

    })


    async function orderMercadoPago(purchaseOrder) {
        try {
            const preference = await mercadopago.preferences.create(purchaseOrder);
            return res.redirect(`${preference.body.init_point}`);
        } catch (err) {
            return res.send(err.message);
        }
    }

})

router.get('/success', auth, (req, res) => {
    const paymentId = req.query.collection_id
    mercadopago.payment.capture(paymentId, mercadopago, (error, response) => {
        if (error) {
            console.log(error);
            res.send('err')
        } else {
            if (response.response.status === 'approved') {
                const SQL = `update configurations set vencimento = ADDDATE(vencimento, INTERVAL 31 DAY), inicio = ADDDATE(inicio, INTERVAL 30 DAY) ;`
                db.connection.query(SQL, (err, result) => {
                    if (err) {
                        req.flash('error_msg', 'Houve um erro ao atualizar a data de vencimento, por favor contate o suporte!'.toUpperCase())
                        res.redirect('/dados/lucros')
                    }
                    req.flash('success_msg', 'Plano Pago com Successo! Data de vencimento Atualizada!'.toUpperCase())
                    res.redirect('/dados/lucros')
                })

            }

        }
    })

})

router.get('/failure', auth, (req, res) => {
    req.flash('error_msg', 'Houve um erro no pagamento, tente novamente mais tarde'.toUpperCase())
    res.redirect('/dados/lucros')

})


module.exports = router
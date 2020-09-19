require('module-alias/register')


const stages = {
    0: {
        desc: "boas vindas",
        obj: require('@/controller/flow/00')
    },
    01: {
        desc: "Vendas apresentar o cardápio",
        obj: require('@controller/flow/01')
    },
    02: {
        desc: "escolhendo quantidade",
        obj: require('@/controller/flow/02')
    },
    03: {
        desc: "manda o produto para a memória",
        obj: require('@controller/flow/03')
    },
    04: {
        desc: "opções",
        obj: require('@controller/flow/04')
    },
    05: {
        desc: "conclusão",
        obj: require('@controller/flow/05')
    },
    06: {
        desc: "etrega no endereço",
        obj: require('@controller/flow/06')
    },
    07: {
        desc: "config bairro",
        obj: require('@controller/flow/07')
    },
    08: {
        desc: 'verifica quantidade de bairro',
        obj: require('@controller/flow/08')
    },
    09: {
        desc: "comer no local, agendar retirado , retirar no balcão",
        obj: require('@controller/flow/09')
    },
    10: {
        desc: "Confirma se precisa de Troco",
        obj: require('@controller/flow/10')
    },
    11: {
        desc: "Mostra o pedido na tela para confirmar ou para corrigir",
        obj: require('@controller/flow/11')
    },
    12: {
        desc: "Finalização",
        obj: require('@controller/flow/12')
    }

}


exports.step = stages
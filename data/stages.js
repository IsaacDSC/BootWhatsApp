require('module-alias/register')
const Menu = require('@models/Menu')

const stages = {
    0: {
        desc: "boas vindas",
        obj: require('@message/00')
    },
    01: {
        desc: "Vendas",
        obj: require('@message/01')
    },
    02: {
        desc: "Resumo",
        obj: require('@message/02')
    },
    03: {
        desc: "Resumo",
        obj: require('@message/03')
    },
    04: {
        desc: "Resumo",
        obj: require('@message/04')
    }
}


exports.step = stages
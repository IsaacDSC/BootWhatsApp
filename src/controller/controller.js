require('module-alias/register')


const stages = {
    0: {
        desc: "boas vindas",
        obj: require('@/controller/flow/00')
    },
    01: {
        desc: "Vendas",
        obj: require('@controller/flow/01')
    },
    02: {
        desc: "Resumo",
        obj: require('@controller/flow/02')
    },
    03: {
        desc: "Resumo",
        obj: require('@controller/flow/03')
    },
    04: {
        desc: "Resumo",
        obj: require('@controller/flow/04')
    }
}


exports.step = stages
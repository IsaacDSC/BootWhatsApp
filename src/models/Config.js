require('module-alias/register')
const db = require('@database/index')

const Config = db.define('configuration', {
    neighborhood: {
        type: db.Sequelize.STRING
    },
    description: {
        type: db.Sequelize.STRING
    },
    classMenu: {
        type: db.Sequelize.STRING
    },
    maxCompra: {
        type: db.Sequelize.STRING
    },
    boot: {
        type: db.Sequelize.STRING
    },
    inicio: {
        type: db.Sequelize.DATEONLY,
    },
    vencimento: {
        type: db.Sequelize.DATEONLY,
    },
    plano: {
        type: db.Sequelize.FLOAT
    }
})

//Config.sync({ force: true })
module.exports = Config
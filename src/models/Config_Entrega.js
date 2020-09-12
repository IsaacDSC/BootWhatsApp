const db = require('../database/index')

const Config_Entrega = db.define('config_entrega', {
    bairro: {
        type: db.Sequelize.STRING,
    },
    cidade: {
        type: db.Sequelize.STRING
    },
    valor: {
        type: db.Sequelize.FLOAT
    },
    tempoEspera: {
        type: db.Sequelize.STRING
    }
})

module.exports = Config_Entrega
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
    }
})

//Config.sync({ force: true })
module.exports = Config
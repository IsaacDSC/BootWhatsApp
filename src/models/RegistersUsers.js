require('module-alias/register')
const db = require('@database/index')

const RegisterUsers = db.define('resgisterUser', {
    businessName: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    document: {
        type: db.Sequelize.STRING(18),
        allowNull: false
    },
    name: {
        type: db.Sequelize.STRING(80),
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    telephone: {
        type: db.Sequelize.STRING(12),
        allowNull: true
    },
    terms: {type:db.Sequelize.STRING(6),
    allowNull: false}
})

//RegisterUsers.sync({ force: true })

module.exports = RegisterUsers
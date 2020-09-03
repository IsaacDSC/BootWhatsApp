const db = require('../database/index')

const User = db.define('user', {
    telephone: {
        type: db.Sequelize.STRING,
        unique: true,
        allowNull: false,
        require: true
    },
    name: {
        type: db.Sequelize.STRING,
        unique: true,
        allowNull: false,
        require: true
    },
    photograph: {
        type: db.Sequelize.STRING
    }
})

//User.sync({ force: true })

module.exports = User
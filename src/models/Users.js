const db = require('../database/index')

const User = db.define('user', {
    name: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
    },
    email: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },
    password: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    }
})

//User.sync({ force: true })

module.exports = User
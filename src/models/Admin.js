const db = require('../database/index')

const Admin = db.define('admin', {
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

//Admin.sync({ force: true })

module.exports = Admin
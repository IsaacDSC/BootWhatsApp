const db = require('../database/index')

//Falta colocar data de criação do Pedido

const Requests = db.define('menu_request', {
    client: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
        unique: true
    },
    package: {
        type: db.Sequelize.TEXT,
        require: true,
        allowNull: false,
    },
    profit: {
        type: db.Sequelize.FLOAT,
        require: true,
        allowNull: false,
    },
    spent: {
        type: db.Sequelize.FLOAT,
        require: true,
        allowNull: false,
    }

})

//Requests.sync({ force: true })

module.exports = Requests
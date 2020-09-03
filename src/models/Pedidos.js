const db = require('../database/index')

const Pedidos = db.Sequelize.define('pedido', {
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

//Pedidos.sync({ force: true })

module.exports = Pedidos
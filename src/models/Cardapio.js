const db = require('../database/index')

const Cardapio = db.define('cardapio', {
    name: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
    }
})

//Admin.sync({ force: true })

module.exports = Cardapio
const db = require('../database/index')
const Menu = db.define('menu', {
    name: {
        type: db.Sequelize.STRING,
        unique: true,
        require: true,
        allowNull: false
    },
    desc: {
        type: db.Sequelize.TEXT,
        require: true,
        allowNull: false
    },
    value: {
        type: db.Sequelize.FLOAT,
        require: true,
        allowNull: false
    },
    costProduce: {
        type: db.Sequelize.FLOAT,
    }

})

//Menu.sync({ force: true })

module.exports = Menu
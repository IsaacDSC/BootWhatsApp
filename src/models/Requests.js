const db = require('../database/index')

//Falta colocar data de criação do Pedido

const Requests = db.define('menu_request', {
    package: {
        type: db.Sequelize.TEXT,
        require: true,
        allowNull: false,
    },
    id_menu:{
        type: db.Sequelize.INTEGER,
        references: {model: 'menus', key: 'id'},
        onDelete: 'CASCADE',
        allowNull: false,
    },
    id_user:{
        type: db.Sequelize.INTEGER,
        references: {model: 'users', key: 'id'},
        onDelete: 'CASCADE',
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
    },
    status:{
        type: db.Sequelize.INTEGER,
        require:true,
        allowNull: false,
    }

})

//Requests.sync({ force: true })

module.exports = Requests
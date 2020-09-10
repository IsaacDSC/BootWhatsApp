const db = require('../database/index')

const Requests = db.define('menu_request', {

    MenuNameId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'menus',
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false

    }, UserId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
    },
    note: {
        type: db.Sequelize.STRING,
        require: false,
    },
    neighborhood: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
    },
    street: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
    },
    numberHouse: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
    },
    shippingAmount: {
        type: db.Sequelize.FLOAT,
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
    },
    status: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
    }

})



//Requests.sync({ force: true })

module.exports = Requests
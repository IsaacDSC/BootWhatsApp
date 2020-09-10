const db = require('../database/index')

//Falta colocar data de criação do Pedido

const Requests = db.define('menu_request', {
    // UserId: {
    //     type: db.Sequelize.STRING,
    //     references: {
    //         model: 'users',
    //         key: 'telephone'
    //     },
    //     onDelete: 'CASCADE',
    //     allowNull: false
    // },
    // MenuNameId: {
    //     type: db.Sequelize.STRING,
    //     references: {
    //         model: 'menus',
    //         key: 'name'
    //     },
    //     onDelete: 'CASCADE',
    //     allowNull: false
    // },
    note: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
        unique: true
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
    package: {
        type: db.Sequelize.TEXT,
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
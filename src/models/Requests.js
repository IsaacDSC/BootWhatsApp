const db = require('../database/index')

const Requests = db.define('request', {
    id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    IdUsuario:{
        type: db.Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
    },
    quantity: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        require: true,
    },
    note: {
        type: db.Sequelize.STRING,
    },
    delivery: {
        type: db.Sequelize.FLOAT,
        allowNull: true,
    },
    formPayment: {
        type: db.Sequelize.STRING
    },
    profit: {
        type: db.Sequelize.FLOAT,

        allowNull: true,
    },
    spent: {
        type: db.Sequelize.FLOAT,

        allowNull: true,
    },
    status: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    deliveryType:{
        type: db.Sequelize.STRING,
        allowNull: false,
    }


})

module.exports = Requests
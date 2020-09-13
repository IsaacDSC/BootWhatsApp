const db = require('../database/index')

const User = db.define('user', {
    id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    telephone: {
        type: db.Sequelize.STRING,
        unique: true,
        allowNull: false,
        require: true
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false,
        require: true
    },
    photograph: {
        type: db.Sequelize.TEXT
    },
    stage: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        require: true
    },
    neighborhood: {
        type: db.Sequelize.STRING,
    },
    address: {
        type: db.Sequelize.TEXT,
    }
})

module.exports = User
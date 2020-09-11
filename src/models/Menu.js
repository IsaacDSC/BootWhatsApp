const { menu } = require('@data/cardapio/promocoes')
const db = require('../database/index')


const Menu = db.define('menu', {
    id:{
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique:true,
    },
    name: {
        type: db.Sequelize.STRING,
        require: true,
        unique: true,
        allowNull: false
    }, class: {
        type: db.Sequelize.STRING
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
    },

})

module.exports = Menu
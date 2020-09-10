const db = require('../database/index')



const Menu = db.define('menu', {
    class: {
        type: db.Sequelize.STRING
    },
    name: {
        type: db.Sequelize.STRING,
        primaryKey: true,
        require: true,
        unique: true,
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
    },

})


//const User = require('@models/Users')

Menu.associate = (models) => {
    Menu.belongsToMany(models.User, {
        through: 'menu_request',
        as: 'menus',
        foreignKey: 'MenuNameId'
    })
}


Menu.associate = (models) => {
    Menu.belongsToMany(models.Users, {
        through: 'menu_request',
        as: 'menus',
        foreignKey: 'id_menu'
    })
}


//Menu.sync({ force: true })




module.exports = Menu
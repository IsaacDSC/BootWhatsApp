const db = require('../database/index')
<<<<<<< HEAD

const Menu = db.define('menu', {
    class: {
        type: db.Sequelize.STRING
=======
const { createTable } = require('./Messages')


/*Itens do Cardapio Ex
      * Lanches *
    1- X-Tudo R$19,00
    (Pão,Maionese,...)
    2- X-bacon R$18,88
    (Pão,Hamburger,...)


       * Promoçao *
    1- X-Tudo R$7,00
    2- X-bacon R$8,88
*/

const Menu = db.define('menu', {
    id:{
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
>>>>>>> 4bdea69e46a983a27029167141a60057a09ec91e
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

<<<<<<< HEAD
//const User = require('@models/Users')

Menu.associate = (models) => {
    Menu.belongsToMany(models.User, {
        through: 'menu_request',
        as: 'menus',
        foreignKey: 'MenuNameId'
    })
}

function create() {
    Menu.sync({ force: true })
}
=======
    Menu.associate=(models)=>{
        Menu.belongsToMany(models.Users,{ 
            through:'menu_request', 
            as: 'menus',
            foreignKey:'id_menu'})
    }


 //Menu.sync({ force: true })

>>>>>>> 4bdea69e46a983a27029167141a60057a09ec91e



module.exports = Menu
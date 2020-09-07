const db = require('../database/index')

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
    name: {
        type: db.Sequelize.STRING,
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
    },
    class: {
        type: db.Sequelize.STRING,
            allowNull: false,
            require: true
    }

})

//Menu.sync({ force: true })

module.exports = Menu
const db = require('../database/index')

/*Cardapio tipo categorias Ex
     
    1-Lanches
    2-Promoções
    3-Bebidas
    4-Açaí
    5-Pizza
*/


const Cardapio = db.define('cardapio', {
    name: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
    }
})

//Cardapio.sync({ force: true })

module.exports = Cardapio
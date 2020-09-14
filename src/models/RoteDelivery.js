const db = require('../database/index')

const Delivery = db.define('delivery', {
    city: {
        type: db.Sequelize.STRING,
        unique: true,
        require: true
    },
    neighborhoods: {
        type: db.Sequelize.STRING,
        require: true
    },
    cost: {
        type: db.Sequelize.FLOAT
    },
    timeDelivery: {
        type: db.Sequelize.STRING
    }
})

//Delivery.sync({ force: true })


module.exports = Delivery
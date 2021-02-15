require('module-alias/register')
const db = require('@database/index')

const Class = db.define('classMenu', {
    classMenu: {
        type: db.Sequelize.STRING,
        unique: true,
    },
    manyFlavors:{
        type: db.Sequelize.BOOLEAN,
        default: 0
    }
})

//Class.sync({ force: true })
module.exports = Class
require('module-alias/register')
const db = require('@database/index')

const Class = db.define('classMenu', {
    classMenu: {
        type: db.Sequelize.STRING,
        unique: true,
    }
})

//Class.sync({ force: true })
module.exports = Class
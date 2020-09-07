const db = require('../database/index')

const Messages = db.define('message', {
    stage: {
        type: db.Sequelize.STRING(3),
        unique: true,
        allowNull: false,
        require: true
    },
    message: {
        type: db.Sequelize.TEXT,
        allowNull: false,
        require: true
    }
})

function createTable() {
    Messages.sync({ force: true }).then(() => {
        return console.log('Resetado com successo')
    })
}


module.exports = { Messages: Messages, createTable: createTable }
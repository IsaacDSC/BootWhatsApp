require('module-alias/register')

const Resquests = require('@models/Requests')
const Menu = require('@models/Menu')
const User = require('@models/Users')

function createTable() {
    Menu.sync({ force: true })
    User.sync({ force: true })
    Resquests.sync({ force: true })
}

createTable()
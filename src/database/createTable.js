require('module-alias/register')
const db = require('./index')

const Resquests = require('@models/Requests')
const Menu = require('@models/Menu')
const User = require('@models/Users')
const Config_Entrega = require('@models/Config_Entrega')

createTable()

async function createTable() {
    Menu.belongsToMany(User, { through: 'menu_request', foreignKey: 'MenuNameId', as: 'menus' })
    User.belongsToMany(Menu, { through: 'menu_request', foreignKey: 'UserId', as: 'user' })
    await db.sync({ force: true })
    Resquests.sync({ force: true })
}
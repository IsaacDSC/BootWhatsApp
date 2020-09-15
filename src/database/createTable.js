require('module-alias/register')
const db = require('./index')

const Resquests = require('@models/Requests')
const Menu = require('@models/Menu')
const User = require('@models/Users')
const Admin = require('@models/Admin')

createTable()

async function createTable() {
    Admin.sync({ force: true })
    Menu.belongsToMany(User, { through: 'menu_request', foreignKey: 'MenuNameId', as: 'menus' })
    User.belongsToMany(Menu, { through: 'menu_request', foreignKey: 'UserId', as: 'user' })
    await db.sync({ force: true })
    Resquests.sync({ force: true })
}
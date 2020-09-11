require('module-alias/register')
const db = require('../database/index')

const Resquests = require('@models/Requests')
const Menu = require('@models/Menu')
const User = require('@models/Users')

createTable()

async function createTable() {
  Menu.belongsToMany(User,{through:'menu_request',foreignKey: 'MenuNameId', as: 'menus'})
  User.belongsToMany(Menu,{through:'menu_request',foreignKey: 'UserId',as:'user'})
  await db.sync({ force: true })
}


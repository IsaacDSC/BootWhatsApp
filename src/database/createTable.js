require('module-alias/register')
const db = require('./index')

const Requests = require('@models/Requests')
const Menu = require('@models/Menu')
const User = require('@models/Users')
const Admin = require('@models/Admin')
const Relacionamento = require('@models/Relacionamento')

createTable()

async function createTable() {
    //Menu.sync({ force: true })
    //  User.sync({ force: true })
    // Requests.sync({ force: true })
    //Menu.belongsToMany(Menu, { through: 'relacionamentos', foreignKey: 'cardapioId', as: 'menus' })
    //User.belongsToMany(User, { through: 'relacionamentos', foreignKey: 'UserId', as: 'users' })
    //Requests.belongsToMany(Requests, { through: 'relacionamentos', foreignKey: 'PedidosId', as: 'requests' })
    Relacionamento.sync({ froce: true })
        Admin.sync({ force: true })
        await db.sync({ force: true })
        //  Resquests.sync({ force: true })
}
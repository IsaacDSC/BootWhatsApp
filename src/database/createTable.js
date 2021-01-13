/* require('module-alias/register')
const db = require('./index')

const Requests = require('@models/Requests')
const Menu = require('@models/Menu')
const User = require('@models/Users')
const Admin = require('@models/Admin')
const Relacionamento = require('@models/Relacionamento')
const ClassMenu = require('@models/classMenu')
const Message = require('@models/Messages')
const RegistersUsers = require('@models/RegistersUsers')
const RoteDelivery = require('@models/RoteDelivery')

let MODELS = [Requests, Menu, User, Admin, Relacionamento, ClassMenu, Message, RegistersUsers, RoteDelivery]

(async function() {
    MODELS.forEach((element, index) => {
        element.sync({ force: true })
            .then(() => { console.log(index, element) })
            .catch((err) => { console.log(index, element, err) })
    })
})()

function relationship() {
    Menu.belongsToMany(Menu, { through: 'relacionamentos', foreignKey: 'cardapioId', as: 'menus' })
    User.belongsToMany(User, { through: 'relacionamentos', foreignKey: 'UserId', as: 'users' })
    Requests.belongsToMany(Requests, { through: 'relacionamentos', foreignKey: 'PedidosId', as: 'requests' })
}

setTimeout(() => {
    relationship()
}, 120000)
 */
// createTable()

// async function createTable() {
//     //Menu.sync({ force: true })
//     //  User.sync({ force: true })
//     // Requests.sync({ force: true })
//     //Menu.belongsToMany(Menu, { through: 'relacionamentos', foreignKey: 'cardapioId', as: 'menus' })
//     //User.belongsToMany(User, { through: 'relacionamentos', foreignKey: 'UserId', as: 'users' })
//     //Requests.belongsToMany(Requests, { through: 'relacionamentos', foreignKey: 'PedidosId', as: 'requests' })
//     Relacionamento.sync({ froce: true })
//     Admin.sync({ force: true })
//     await db.sync({ force: true })
//         //  Resquests.sync({ force: true })
// }
require('module-alias/register')
const Requests = require('@models/Requests')
const User = require('@models/Users')
const Menu = require('@models/Menu')

// Requests.findAll().then((pedidos) => {

//     for (let pedido of pedidos) {
//         //console.log(pedido.UserId)
//         User.findAll({ where: { id: pedido.UserId } }).then((users) => {
//             for (let user of users) {
//                 //console.log(user.name)
//                 Menu.findAll({ where: { id: pedido.MenuNameId } }).then((menus) => {
//                     for (let menu of menus) {
//                         //console.log(menu.name)
//                         console.log(`pedido:${pedido.id} - ${user.name} comprou ${menu.name} `)
//                     }
//                 })
//             }
//         })
//     }
// }).catch((err) => {
//     console.log(err)
// })

Requests.findAll().then((pedidos) => {
    pedidos.forEach(elementRequest => {
        //console.log(elementOne.MenuNameId)
        User.findAll(({ where: { id: elementRequest.UserId } })).then((users) => {
            users.forEach(elementUser => {
                Menu.findAll({ where: { id: elementRequest.MenuNameId } }).then((menus) => {
                    menus.forEach(elementMenu => {
                        console.log(typeof elementMenu.quantity)
                        console.log(`${elementUser.name} comprou ${elementRequest.quantity}x - ${elementMenu.name} no valor de ${elementRequest.profit}`)
                    })
                })
            })
        })
    })
})
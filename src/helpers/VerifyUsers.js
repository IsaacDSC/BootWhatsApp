require('module-alias/register')
const Users = require('../models/Users')


function verify() {
    Users.findAll().then((users) => {
        users.forEach((value) => {
            console.log(value.telephone)
            const tell = value.telephone
            exports.tell = tell
        })
    })
}
exports.verify = verify
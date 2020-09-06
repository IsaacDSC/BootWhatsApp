const Users = require('../src/models/Users')
Users.find({ where: { telephone } }).then((user) => {
    console.log(user)
})
const Requests = require('../src/models/Requests')


Requests.create({
    MenuNameId: 1,
    UserId: 1,
    quantity: 1,
}).then(() => console.log('Produto Cadastrado Para O Usuario'))
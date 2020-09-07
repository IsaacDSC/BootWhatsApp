const Users = require('../src/models/Users')
    // Users.findOne({ where: { telephone: '553588798846@c.us' } }).then((user) => {
    //     console.log(user)
    //     user.stage = 1,
    //         user.save().then(() => {
    //             console.log('ok')
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // })

const User = Users.findOne({ where: { telephone: '553588798846@c.us' } })
try {
    User.then((stage) => {
        stage.stage = 0,
            stage.save().then(() => {
                console.log('Estagio zero')
            })
    })
} catch (error) {
    console.log('erro ao enviar usuario para o proximo estagio: ' + error)
}
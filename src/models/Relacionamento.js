require('module-alias/register')
const db = require('../database/index')

const Relacionamento = db.define('relacionamento', {
    UserId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
    },
    MenuId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'menus',
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
    },
    PedidosId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'requests',
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
    }

})


module.exports = Relacionamento
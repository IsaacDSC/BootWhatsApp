const db = require('../database/index')

const User = db.define('user', {
    telephone: {
        type: db.Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
        require: true
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false,
        require: true
    },
    photograph: {
        type: db.Sequelize.TEXT
    },
    stage: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        require: true
    }
})

User.associate = (models) => {
    User.belongsToMany(models.Menu, {
        through: 'menu_request',
        as: 'users',
        foreignKey: 'MenuNameId'
    })
}

function create() {
    User.sync({ force: true })
}

//nao precisa estar neste arquivo

module.exports = User
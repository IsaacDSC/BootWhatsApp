const db = require('../database/index')

const User = db.define('user', {
    id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    telephone: {
        type: db.Sequelize.STRING,
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
        as: 'user',
        foreignKey: 'id_user'
    })
}

function create() {
    User.sync({ force: true })
}

//nao precisa estar neste arquivo

module.exports = User
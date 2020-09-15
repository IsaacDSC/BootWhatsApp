'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.createTable('user', {
            id: {
                type: Sequelize.INTERGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            telephone: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                require: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                require: true
            },
            photograph: {
                type: Sequelize.TEXT
            },
            stage: {
                type: Sequelize.INTEGER,
                allowNull: false,
                require: true
            },
            neighborhood: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.TEXT,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            },

        })
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.dropTable('user')
    }
};
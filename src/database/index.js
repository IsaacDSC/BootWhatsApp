const Sequelize = require('sequelize')
const dbConfig = require('../config/database')


const connection = new Sequelize(dbConfig)


//const connection = new Sequelize('Almeidalanche', 'dev', 'secret(!#)123TECH', {
//  host: 'bootwhatsapp.cwdkivtj8ka1.sa-east-1.rds.amazonaws.com',
//  dialect:'mysql'
//})

module.exports = connection
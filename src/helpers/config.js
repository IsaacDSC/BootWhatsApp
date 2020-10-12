require('module-alias/register')

const Config = require('../models/Config')

async function configBairroAtivo() {
    const bairroConfig = await Config.findOne({ attributes: ['neighborhood']})
    return bairroConfig.dataValues.neighborhood
}
async function configDescriptionAtivo() {
    const bairroConfig = await Config.findOne({ attributes: ['description']})
    return bairroConfig.dataValues.description
}
async function configMaxCompra() {
    const bairroConfig = await Config.findOne({ attributes: ['maxCompra']})
    return bairroConfig.dataValues.maxCompra
}
async function configBotAtivo() {
    const bairroConfig = await Config.findOne({ attributes: ['boot']})
    return bairroConfig.dataValues.boot
}

exports.configBotAtivo = configBotAtivo

exports.configMaxCompra = configMaxCompra

exports.configBairroAtivo = configBairroAtivo

exports.configDescriptionAtivo = configDescriptionAtivo
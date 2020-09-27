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

exports.configBairroAtivo = configBairroAtivo

exports.configDescriptionAtivo = configDescriptionAtivo
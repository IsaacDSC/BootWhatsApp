require('module-alias/register')
const Users = require('@models/Users')

async function updateOrCreate (telephone, newItem) {

   const foundItem = await Users.findOne({where:{telephone}});
   if (!foundItem) {
        const item = await Users.create(newItem)
        return  item.dataValues.id
    }

    const item = await Users.update(newItem, {where:{telephone}});
    const id = await Users.findOne({where:{telephone}})

    return id.dataValues.id
}


exports.updateOrCreate = updateOrCreate
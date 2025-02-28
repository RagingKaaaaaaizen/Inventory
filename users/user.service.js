
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Role = require('../_helpers/role');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { part_name: params.part_name } })) {
        throw 'Part name "' + params.part_name + '" is already registered';
    }

    const user = new db.User(params);
    await user.save();
    return user;
}

async function update(id, params) {
    const user = await getUser(id);
    
    // validate if part name is being changed
    const partNameChanged = params.part_name && user.part_name !== params.part_name;
    if (partNameChanged && await db.User.findOne({ where: { part_name: params.part_name } })) {
        throw 'Part name "' + params.part_name + '" is already taken';
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
    return user;
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper function
async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'Part not found';
    return user;
}

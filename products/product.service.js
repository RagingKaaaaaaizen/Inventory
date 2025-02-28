const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Product.findAll();
}

async function getById(id) {
    const product = await getProduct(id);
    return product;
}

async function create(params) {
    // validate
    if (await db.Product.findOne({ where: { sku: params.sku } })) {
        throw 'SKU "' + params.sku + '" is already registered';
    }

    const product = new db.Product(params);
    await product.save();
    return product;
}

async function update(id, params) {
    const product = await getProduct(id);
    
    // validate SKU if it's being changed
    const skuChanged = params.sku && product.sku !== params.sku;
    if (skuChanged && await db.Product.findOne({ where: { sku: params.sku } })) {
        throw 'SKU "' + params.sku + '" is already taken';
    }

    // copy params to product and save
    Object.assign(product, params);
    await product.save();
    
    return product;
}

async function _delete(id) {
    const product = await getProduct(id);
    await product.destroy();
}

// helper function
async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Product not found';
    return product;
} 
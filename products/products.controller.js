const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate_request');
const productService = require('./product.service');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    productService.getAll()
        .then(products => res.json(products))
        .catch(next);
}

function getById(req, res, next) {
    productService.getById(req.params.id)
        .then(product => res.json(product))
        .catch(next);
}

function create(req, res, next) {
    productService.create(req.body)
        .then(product => res.json(product))
        .catch(next);
}

function update(req, res, next) {
    productService.update(req.params.id, req.body)
        .then(product => res.json(product))
        .catch(next);
}

function _delete(req, res, next) {
    productService.delete(req.params.id)
        .then(() => res.json({ message: 'Product deleted successfully' }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().allow('', null),
        price: Joi.number().precision(2).positive().required(),
        category: Joi.string().required(),
        stock: Joi.number().integer().min(0).required(),
        sku: Joi.string().required(),
        isActive: Joi.boolean()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        description: Joi.string().allow('', null),
        price: Joi.number().precision(2).positive(),
        category: Joi.string().empty(''),
        stock: Joi.number().integer().min(0),
        sku: Joi.string().empty(''),
        isActive: Joi.boolean()
    });
    validateRequest(req, next, schema);
} 
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate_request');
const userService = require('./user.service');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Part created successfully' }))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Part updated successfully' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'Part deleted successfully' }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        part_name: Joi.string().required(),
        category_id: Joi.number().integer().required(),
        brand_id: Joi.number().integer().required(),
        model_number: Joi.string().required(),
        description: Joi.string().required(),
        stock_quantity: Joi.number().integer().min(0).required(),
        price: Joi.number().precision(2).positive().required(),
        isActive: Joi.boolean()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        part_name: Joi.string().empty(''),
        category_id: Joi.number().integer(),
        brand_id: Joi.number().integer(),
        model_number: Joi.string().empty(''),
        description: Joi.string().empty(''),
        stock_quantity: Joi.number().integer().min(0),
        price: Joi.number().precision(2).positive(),
        isActive: Joi.boolean()
    });
    validateRequest(req, next, schema);
}
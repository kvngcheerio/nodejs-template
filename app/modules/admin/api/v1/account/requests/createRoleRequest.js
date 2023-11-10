const Joi = require('joi');

const FormValidator = require(__utils + '/formValidator');

const createRoleRequest = new FormValidator({
    name: Joi
        .string()
        .required(),

    display_name: Joi
        .string()
        .required(),

    description: Joi
        .string(),
});

module.exports = createRoleRequest;

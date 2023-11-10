const Joi = require('joi');

const FormValidator = require(__utils + '/formValidator');

const updateRoleRequest = new FormValidator({
    name: Joi
        .string(),

    display_name: Joi
        .string(),

    description: Joi
        .string(),
});

module.exports = updateRoleRequest;

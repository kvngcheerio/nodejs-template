const Joi = require('joi');
const FormValidator = require(__utils + 'formValidator');

const loginFormValidation = new FormValidator({
    email: Joi.string(),
    password: Joi.string().required(),
});

module.exports = loginFormValidation;

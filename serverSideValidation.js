const joi = require('joi');

module.exports.userRegisterValidation = joi.object({
    user: joi.object({
        email: joi.string().required(),
        username: joi.string().required(),
        userType: joi.string().required(),
        password: joi.string().required(),
        passwordCheck: joi.string().required()
    }).required()
})
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

module.exports.addCoursesValidation = joi.object({
    course: joi.object({
        courseTitle: joi.string().required(),
        courseDescription: joi.string().required()
    })
})
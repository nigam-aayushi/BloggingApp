const joi = require('@hapi/joi')
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const user_schema = {
    registerUser : joi.object({
        name : joi.string().max(50).min(3).required().messages({
            'string.empty': 'Display name cannot be empty',
            'string.min': 'Min 2 characters',
          }),
        email: joi.string().min(6).required().email().messages({
            'string.empty': 'Display email cannot be empty',
          }),
          password: joiPassword
                        .string()
                        .minOfSpecialCharacters(2)
                        .minOfLowercase(2)
                        .minOfUppercase(1)
                        .minOfNumeric(2)
                        .noWhiteSpaces()
                        .messages({
                              'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                              'password.minOfSpecialCharacters':
                                    '{#label} should contain at least {#min} special character',
                              'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                              'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                              'password.noWhiteSpaces': '{#label} should not contain white spaces',
                        }),
        city : joi.string().max(20).min(3).required().messages({
            'string.empty': 'Display city cannot be empty',
            'string.min': 'Min 2 characters',
          }),
        state : joi.string().max(20).min(2).required().messages({
            'string.empty': 'Display state cannot be empty',
            'string.min': 'Min 2 characters',
          })
    }).unknown(true),

//user login validation
    loginUser : joi.object({
        email: joi.string().min(6).required().email().messages({
            'string.empty': 'Display email cannot be empty',
          }),
        password: joiPassword
                        .string()
                        .minOfSpecialCharacters()
                        .minOfLowercase()
                        .minOfUppercase()
                        .minOfNumeric()
                        .noWhiteSpaces()
                        .messages({
                              'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                              'password.minOfSpecialCharacters':
                                    '{#label} should contain at least {#min} special character',
                              'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                              'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                              'password.noWhiteSpaces': '{#label} should not contain white spaces',
                        })
    })
}

module.exports = user_schema
const joi = require('@hapi/joi')
joi.objectId = require('joi-objectid')(joi)

const schema = {
    add_blogs : joi.object({
        title : joi.string().min(4).max(8).required(),
        discribtion : joi.string().min(4).max(200).required(),
        like : joi.boolean(),
        userId : joi.objectId().required()
    }).unknown(true)
}

module.exports = schema
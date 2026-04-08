const Joi = require("joi")

const fournisseursSchema  = Joi.object({
    name : Joi.string().min(2).max(20).required(),
    contact: Joi.string().allow("").optional(),
})

module.exports={
    fournisseursSchema 
}
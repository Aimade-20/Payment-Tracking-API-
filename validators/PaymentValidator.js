
const Joi = require("joi")

const createPayement = Joi.object({
    amount :Joi.number()
    .positive()
    .required()
    .message({
        "number.base": "Le montant doit être un nombre",
      "number.positive": "Le montant doit être strictement supérieur à 0",
      "any.required": "Le montant est obligatoire",
    }),
paymentDate : Joi.date()
.max("max")
.required()
.message({
    "date.base": "La date doit être une date valide",
      "date.max": "La date ne peut pas être dans le futur",
      "any.required": "La date est obligatoire",
}),
mode_paiment :Joi.string()
.valid("especes","cheque","virement")
.required()
.messages({
    "any.only": "Le mode de paiement doit être : espèces, chèque ou virement",
      "any.required": "Le mode de paiement est obligatoire",
}),
note :Joi.string()
.optional()
.allow("")
.messages({
    "string.base":"La note doit être une chaîne de caractères",
})
})
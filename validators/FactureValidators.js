const Joi = require("joi");

const createInvoice = Joi.object({
  supplierId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.empty": "supplierId est obligatoire",
      "string.pattern.base": "supplierId invalide",
      "any.required": "supplierId est obligatoire",
    }),

  amount: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Le montant doit être un nombre",
      "number.positive": "Le montant doit être strictement supérieur à 0",
      "any.required": "Le montant est obligatoire",
    }),

  dueDate: Joi.date()
    .required()
    .messages({
      "date.base": "La date d'échéance doit être une date valide",
      "any.required": "La date d'échéance est obligatoire",
    }),

  description: Joi.string()
    .optional()
    .allow("")
    .messages({
      "string.base": "La description doit être une chaîne de caractères",
    }),
});

const updateFactur = Joi.object({
  supplierId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .messages({
      "string.empty": "supplierId est obligatoire",
      "string.pattern.base": "supplierId invalide",
      "any.required": "supplierId est obligatoire",
    }),

  amount: Joi.number()
    .positive()
    .optional()
    .messages({
      "number.base": "Le montant doit être un nombre",
      "number.positive": "Le montant doit être strictement supérieur à 0",
      "any.required": "Le montant est obligatoire",
    }),

  dueDate: Joi.date()
    .optional()
    .messages({
      "date.base": "La date d'échéance doit être une date valide",
      "any.required": "La date d'échéance est obligatoire",
    }),

  description: Joi.string()
    .optional()
    .allow("")
    .messages({
      "string.base": "La description doit être une chaîne de caractères",
    }),
});


module.exports = { createInvoice,updateFactur };
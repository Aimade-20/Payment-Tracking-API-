const { registerSchema, loginSchema } = require("../validators/userValidators");
const {fournisseursSchema } = require("../validators/fournisseursValidator")
const {createInvoice ,updateFactur} = require("../validators/FactureValidators")
const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    next();
  };
};

const validateRegister = validateSchema(registerSchema);
const validateLogin = validateSchema(loginSchema);
const fournisseursValidator = validateSchema(fournisseursSchema)
const factureValidator = validateSchema(createInvoice)
const UpfactureValidator = validateSchema(updateFactur)
module.exports = {
  validateSchema,
  validateRegister,
  validateLogin,
  fournisseursValidator,
  factureValidator,
  UpfactureValidator
};

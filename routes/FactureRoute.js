const express = require("express");

const router = express.Router();

const { create,getAll ,update,remove} = require("../controllers/FactureController");
const { factureValidator,UpfactureValidator } = require("../middlewares/validationMiddleware");
const factureMiddleware = require("../middlewares/userMiddleware");
const { updateFactur } = require("../validators/FactureValidators");

router.post("/invoices",factureMiddleware,factureValidator,create);
router.get("/invoices", factureMiddleware,getAll);
router.put("/invoices/:id", factureMiddleware, UpfactureValidator, update);
router.delete("/invoices/:id",factureMiddleware,remove)

module.exports = router;
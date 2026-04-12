const express = require("express");

const router = express.Router();

const {addPayment,getPayments,getSupplierStats} = require("../controllers/paymentController");
const { factureValidator,UpfactureValidator } = require("../middlewares/validationMiddleware");
const factureMiddleware = require("../middlewares/userMiddleware");

router.post("/invoices/:id/payments",factureMiddleware,addPayment);
router.get("/invoices/:id/payments", factureMiddleware, getPayments);
router.get("/suppliers/:id/stats", factureMiddleware, getSupplierStats);

module.exports = router;
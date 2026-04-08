const express = require("express")
const router = express.Router()

const {create} = require("../controllers/fournisseursControllers")
const {getAllFournisseurs} = require("../controllers/fournisseursControllers")
const {getFournisseursById} = require("../controllers/fournisseursControllers")
const {fournisseursValidator} = require("../middlewares/validationMiddleware")
const fournisseursMiddleware = require("../middlewares/userMiddleware")
router.post("/suppliers", fournisseursMiddleware,fournisseursValidator,create)
router.get("/suppliers" ,fournisseursMiddleware,fournisseursValidator,getAllFournisseurs)
router.get("/suppliers/:id" ,fournisseursMiddleware,fournisseursValidator,getFournisseursById)

module.exports = router;
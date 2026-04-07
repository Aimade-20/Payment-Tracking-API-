const express = require("express")
const router = express.Router()
const { registerController,loginController} = require("../controllers/userControllets")
const {validateRegister , validateLogin} = require("../middlewares/validationMiddleware")

router.post("/register", validateRegister, registerController);
router.post("/login", validateLogin, loginController);

module.exports = router; 
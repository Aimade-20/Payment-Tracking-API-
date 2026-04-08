const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  geMe,
} = require("../controllers/userControllets");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validationMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");
router.post("/register", validateRegister, registerController);
router.post("/login", validateLogin, loginController);
router.get("/me", userMiddleware, geMe);

module.exports = router;

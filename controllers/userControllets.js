const { register, login } = require("../services/userServices");

const registerController = async (req, res, next) => {
  try {
    const user = await register(req.body);
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    if (error.message === "User already exists") {
      return res.status(422).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json({
      success: true,
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

module.exports = { registerController, loginController };

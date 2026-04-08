const { register, login } = require("../services/userServices");
const User=require("../models/user")
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

const geMe = async(req, res , next) =>{
  try {
    const user = await User.findById(req.user.id).select("-password")
    if(!user){
      return res.status(404).json({message : "User not found"})
    }
    res.status(200).json({
      status : "success",
      data : {user}
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { registerController, loginController ,geMe};

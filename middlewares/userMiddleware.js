const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userMiddleware = async (req, res, next) => {
  try {
    const userHeader = req.headers.authorization;

    if (!userHeader || !userHeader.startsWith("Bearer")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = userHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foundUser = await User.findById(decoded.userId);
    if (!foundUser) return res.status(401).json({ error: "user not found" });
    // console.log(foundUser);
    
    req.user = foundUser;
    next(); 
    
  } catch (error) {
    return res.status(401).json({ error: "invalid token" });
  }
};

module.exports = userMiddleware;
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function register(data){
    const {name , email ,password ,role} = data

    const existingUser = await User.findOne({email})
    // console.log(existingUser);
    
    if(existingUser){
        throw new Error("user already exists")
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
        name,
        email,
        password :hashedPassword,
        role,
    })
    return user
}
async function login (email , password){
    const fondUser = await User.findOne({email}).select("+password")
    // console.log(fondUser);
    
    if(!fondUser){
        throw new Error("invalid creadentials")
    }
    const isMatch = await bcrypt.compare(password , fondUser.password)
    if(!isMatch){
        throw new Error("Invalid creadentials")
    }
    const token =jwt.sign(
        {userId : fondUser._id,role : fondUser.role},
        process.env.JWT_SECRET,
        {expiresIn : process.env.JWT_EXPIRES}
    )
    return {token}
}
async function getUserById(id) {
    return await User.findById(id).select("-password")
}

module.exports ={register , login,getUserById}
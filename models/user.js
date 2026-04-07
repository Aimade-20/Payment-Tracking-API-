const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
    {
        name :{type :String ,
            required :[true , "le nom est obligatoire"],
            trim : true ,
            minlength :[2, "le nom doit contenir au moins 2 cractéres"]
        },
        email :{
            type : String,
            required :[true ,"L'email est obligatoire"],
            unique : true,
            lowercase : true,
            trim : true ,
            match : [/^\S+@\S+\.\S+$/, "Format email invalide"],
        },
        password :{
            type :String,
            required : [true , "Le mot de passe est obligatoire"],
            minlength : [6,"Le mot de passe doit contenir au moins 6 caractères"],
            select : false,
        },
        role :{
            type : String,
            enum :{
                values :["client","admin"],
                message : "Rôle invalide. Valeurs acceptées : client, admin",

            },
            default :"client"
        }
    },
    {timestamps : true}
)


userSchema.methods.comparePassword= async function (candidatePassword) {
    return bcrypt.compare(candidatePassword,this.password)
}
userSchema.methods.toJSON =function(){
    const obj = this.toObject()
    delete obj.password
    return obj
}
module.exports = mongoose.model("user" , userSchema)
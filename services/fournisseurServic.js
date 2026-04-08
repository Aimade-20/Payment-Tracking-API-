const Fournisseurs = require("../models/Fournisseurs")

async function createFournisseurs (data ,userId){
    const {name,contact} = data
    const fournisseurs = await Fournisseurs.create({
        name,
        contact,
        client : userId
    })
    return fournisseurs
}
async function getAllFournisseurs(userId){
    return await Fournisseurs.find({client :userId}).populate("client")
}

async function getFournisseursById(_id){
const fournisseur = await fournisseur.findById(_id)
if(!fournisseur) throw new Error("fournisseur not found")
    return fournisseur 
}




module.exports ={
    createFournisseurs,
    getAllFournisseurs,
    getFournisseursById
}
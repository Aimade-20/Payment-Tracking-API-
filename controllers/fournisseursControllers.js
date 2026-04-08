const fournisseursService = require("../services/fournisseurServic")

async function create  (req ,res){
    try {
        const fournisseurs = await fournisseursService.createFournisseurs(
            req.body,
            req.user.id
        )
        res.status(200).json(fournisseurs)
    } catch (error) {
        console.error(error)
        res.status(400).json({message : error.message})
    }
}
async function getAllFournisseurs(req ,res){
    try {
        const fournisseurs = await fournisseursService.getAllFournisseurs(req.user.id)
        res.status(200).json(fournisseurs)
    } catch (error) {
        res.status(400).json({message :error.message})
    }
}

async function getFournisseursById(req , res){
    try {
        const fournisseurs = await fournisseursService.getFournisseursById()
        res.status(200).json(fournisseurs)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}
module.exports={
    create,
    getAllFournisseurs,
    getFournisseursById
}
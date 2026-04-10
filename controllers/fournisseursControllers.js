const fournisseursService = require("../services/fournisseurServic");

async function create(req, res) {
  try {
    const fournisseurs = await fournisseursService.createFournisseurs(
      req.body,
      req.user.id,
    );
    res.status(200).json(fournisseurs);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}
async function getAllFournisseurs(req, res) {
  try {
    const fournisseurs = await fournisseursService.getAllFournisseurs(
      req.user.id,
    );
    res.status(200).json(fournisseurs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getFournisseursById(req, res) {
  try {
    const fournisseurs = await fournisseursService.getFournisseursById(
      req.params.id,
    );
    res.status(200).json(fournisseurs);
  } catch (error) {
    // console.log(error)
    res.status(400).json({ message: error.message });
  }
}

async function deleteFournisseur(req, res) {
  try {
    const fournisseurs = await fournisseursService.deleteFournisseur(
      req.params.id
    );
    res.status(200).json({
      message : "fournisseurs deleted successfully"
    });
  } catch (error) {
  //  console.log(error);
    res.status(400).json({ message: error.message });
  }
}

async function updateFournisseur(req , res){
  try {
    const fournisseurs = await fournisseursService.updateFournisseur(
      req.params.id,
      req.user.id,
      req.body
    )
    res.status(200).json({message : "fournisseurs updeted successfully"})
  } catch (error) {
    console.error(error);
    
    res.status(400).json({message :error.message})
  }
}
module.exports = {
  create,
  getAllFournisseurs,
  getFournisseursById,
  deleteFournisseur,
  updateFournisseur
};

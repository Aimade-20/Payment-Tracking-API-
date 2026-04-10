const Fournisseurs = require("../models/Fournisseurs");

async function createFournisseurs(data, userId) {
  const { name, contact } = data;
  const fournisseurs = await Fournisseurs.create({
    name,
    contact,
    client: userId,
  });
  return fournisseurs;
}
async function getAllFournisseurs(userId) {
  return await Fournisseurs.find({ client: userId }).populate("client");
}

async function getFournisseursById(_id) {
  const fournisseur = await Fournisseurs.findById(_id);
  if (!fournisseur) throw new Error("fournisseur not found");
  return fournisseur;
}

async function deleteFournisseur(_id) {
  // console.log(_id);
  const fournisseur = await Fournisseurs.findByIdAndDelete(_id);
  return fournisseur;
}

async function updateFournisseur(_id, userId, data) {
  const fournisseur = await Fournisseurs.findOne({ _id, client: userId });
  if (!fournisseur) throw new Error("fournisseur not found");
  const allowsFields = ["name", "contact"];
  allowsFields.forEach((item) => {
    if (data[item] !== undefined) {
      fournisseur[item] = data[item];
    }
  });
  await fournisseur.save();
  return fournisseur;
}

module.exports = {
  createFournisseurs,
  getAllFournisseurs,
  getFournisseursById,
  deleteFournisseur,
  updateFournisseur,
};

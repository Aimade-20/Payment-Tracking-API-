
const mongoose = require("mongoose");

const fournisseursSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contact: { type: String },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Fournisseur = mongoose.model("Fournisseur", fournisseursSchema);
// console.log(Fournisseur);

module.exports = Fournisseur; 
// supplierId, amount, dueDate
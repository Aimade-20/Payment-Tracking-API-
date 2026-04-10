const mongoose = require("mongoose");
const Fournisseur = require("./Fournisseurs");

const FacturSchema = new mongoose.Schema({
  FournisseurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fournisseurs",
  },
  amount: {
    type: Number,
    required: [true, "le montant est onligatoire"],
    min: [1, "Le montant doit être supérieur à 0"],
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  description :{
    type : String
  }
  
});

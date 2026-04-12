const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0.01, "Le montant doit être supérieur à 0"],
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
    mode_paiement: {
      type: String,
      enum: ["espèces", "chèque", "virement"],
      required: true,
    },
    note: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
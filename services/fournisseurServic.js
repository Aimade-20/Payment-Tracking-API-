const Fournisseurs = require("../models/Fournisseurs");
const Factures = require("../models/Factures");
const Payment = require("../models/payment");

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

async function getSupplierStats(supplierId, userId) {
  const supplier = await Fournisseurs.findById(supplierId);
  if (!supplier) throw new Error("Supplier not found");

  if (supplier.client.toString() !== userId.toString()) {
    throw new Error("Forbidden");
  }

  const factures = await Factures.find({ supplierId, userId });
  const totalInvoices = factures.length;
  const totalAmount = factures.reduce((sum, f) => sum + f.amount, 0);

  const factureIds = factures.map((f) => f._id);
  const payments = await Payment.find({ invoiceId: { $in: factureIds } });
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalRemaining = totalAmount - totalPaid;

  const overdueCount = factures.filter((f) => f.status === "overdue").length;

  const invoicesByStatus = {
    unpaid: factures.filter((f) => f.status === "unpaid").length,
    partially_paid: factures.filter((f) => f.status === "partially_paid").length,
    paid: factures.filter((f) => f.status === "paid").length,
  };

  const allFactures = await Factures.find({ userId });
  const globalTotal = allFactures.reduce((sum, f) => sum + f.amount, 0);
  const percentage = globalTotal > 0
    ? parseFloat(((totalAmount / globalTotal) * 100).toFixed(2))
    : 0;

  return {
    supplierId: supplier._id,
    supplierName: supplier.name,
    totalInvoices,
    totalAmount,
    totalPaid,
    totalRemaining,
    overdueCount,
    percentage,
    invoicesByStatus,
  };
}

module.exports = {
  createFournisseurs,
  getAllFournisseurs,
  getFournisseursById,
  deleteFournisseur,
  updateFournisseur,
  getSupplierStats,
};
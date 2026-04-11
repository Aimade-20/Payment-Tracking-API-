const Factures = require('../models/Factures');
const Fournisseur = require('../models/Fournisseurs');
const Payment = require('../models/payment');

async function createFacture(data, userId) {
  const { amount, dueDate, supplierId, description } = data;
  
  const facture = await Factures.create({
    amount,
    dueDate,
    supplierId, 
    userId,       
    description,
  });
  return facture;
}

async function getFactures(userId, filters = {}, page = 1, limit = 15) {
  const query = { userId };
  if (filters.status) query.status = filters.status;
  if (filters.supplierId) query.supplierId = filters.supplierId;

  const factures = await Factures.find(query)
    .populate("supplierId", "name")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);


  const result = await Promise.all(
    factures.map(async (facture) => {
      const payments = await Payment.find({ invoiceId: facture._id });
      const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
      const remainingAmount = facture.amount - totalPaid;

      return {
        id: facture._id,
        supplierId: facture.supplierId?._id,
        supplierName: facture.supplierId?.name,
        amount: facture.amount,
        dueDate: facture.dueDate,
        status: facture.status,
        totalPaid,
        remainingAmount,
        createdAt: facture.createdAt,
      };
    })
  );

  return result;
}


async function updateFacture(factureId, userId, data) {

  const facture = await Factures.findById(factureId);
  

  if (!facture) throw new Error("Facture not found");


  if (facture.userId.toString() !== userId.toString()) {
    throw new Error("Forbidden");
  }


  const payments = await Payment.find({ invoiceId: factureId });
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);


  if (totalPaid >= facture.amount) {
    throw new Error("Facture totalement payée, modification refusée");
  }

  Object.assign(facture, data);
  return await facture.save();
}

async function deleteFacture(factureId, userId) {

  const facture = await Factures.findById(factureId);


  if (!facture) throw new Error("Facture not found");


  if (facture.userId.toString() !== userId.toString()) {
    throw new Error("Forbidden");
  }


  const payments = await Payment.find({ invoiceId: factureId });
  if (payments.length > 0) {
    throw new Error("Impossible de supprimer une facture avec des paiements associés");
  }

  await Factures.findByIdAndDelete(factureId);
  return { message: "Facture supprimée" };
}



module.exports = { createFacture,getFactures,updateFacture,deleteFacture};
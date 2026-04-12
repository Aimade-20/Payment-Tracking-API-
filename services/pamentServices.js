const Payment = require('../models/payment');
const Factures = require('../models/Factures');

async function createPayment(factureId, userId, data) {
  const facture = await Factures.findById(factureId);
  if (!facture) throw new Error("Facture not found");

  if (facture.userId.toString() !== userId.toString()) {
    throw new Error("Forbidden");
  }

  if (facture.status === "paid") {
    throw new Error("Facture déjà payée");
  }

  const payments = await Payment.find({ invoiceId: factureId });
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

  if (totalPaid + data.amount > facture.amount) {
    throw new Error(
      `Le montant dépasse le restant dû (${facture.amount - totalPaid})`
    );
  }

  const payment = await Payment.create({
    invoiceId: factureId,
    userId,
    amount: data.amount,
    paymentDate: data.paymentDate,
    mode_paiement: data.mode_paiement,
    note: data.note,
  });

  const newTotalPaid = totalPaid + data.amount;

  if (newTotalPaid >= facture.amount) {
    facture.status = "paid";
  } else {
    facture.status = "partially_paid";
  }
  await facture.save();

  return {
    id: payment._id,
    invoiceId: payment.invoiceId,
    userId: payment.userId,
    amount: payment.amount,
    paymentDate: payment.paymentDate,
    note: payment.note,
    createdAt: payment.createdAt,
    facture: {
      id: facture._id,
      status: facture.status,
      totalPaid: newTotalPaid,
      remainingAmount: facture.amount - newTotalPaid,
    }
  };
}

async function getPayments(factureId, userId) {
  // كنجيبو facture
  const facture = await Factures.findById(factureId);
  if (!facture) throw new Error("Facture not found");

  // كنتحققو من ownership - 403
  if (facture.userId.toString() !== userId.toString()) {
    throw new Error("Forbidden");
  }

  // كنجيبو جميع payments ديال هاد facture
  const payments = await Payment.find({ invoiceId: factureId });

  // كنحسبو totalPaid
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remainingAmount = facture.amount - totalPaid;

  return {
    payments: payments.map((p) => ({
      id: p._id,
      invoiceId: p.invoiceId,
      userId: p.userId,
      amount: p.amount,
      paymentDate: p.paymentDate,
      mode_paiement: p.mode_paiement,
      createdAt: p.createdAt,
    })),
    summary: {
      totalPaid,
      remainingAmount,
      status: facture.status,
    },
  };
}

async function getSupplierStats(supplierId, userId) {

  const supplier = await Fournisseur.findById(supplierId);
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

module.exports = { createPayment, getPayments,getSupplierStats };
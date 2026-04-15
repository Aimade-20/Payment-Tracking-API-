
const pamentService = require("../services/pamentServices")
const fournisseursService = require("../services/fournisseurServic");


async function addPayment(req, res) {
  try {
    const payment = await pamentService.createPayment(
      req.params.id,
      req.user._id,
      req.body
    );
    res.status(201).json(payment);
  } catch (error) {
    // console.error(error);
    
    if (error.message === "Facture not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Forbidden") {
      return res.status(403).json({ message: error.message });
    }
    if (error.message.includes("payée") || error.message.includes("dépasse")) {
      return res.status(422).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
}

async function getPayments(req, res) {
  try {
    const result = await pamentService.getPayments(
      req.params.id,
      req.user._id
    );
    res.status(200).json(result);
  } catch (error) {
    // console.error(error);
    if (error.message === "Facture not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Forbidden") {
      return res.status(403).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
}

async function getSupplierStats(req, res) {
  try {
    const stats = await fournisseursService.getSupplierStats(
      req.params.id,
      req.user._id
    );
    res.status(200).json(stats);
  } catch (error) {
    // console.error(error);
    if (error.message === "Supplier not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Forbidden") {
      return res.status(403).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
}

module.exports={addPayment,getPayments,getSupplierStats}
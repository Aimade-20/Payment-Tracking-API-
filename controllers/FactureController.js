const FactureService = require('../services/FactureServices');
async function create(req, res) {
  try {
    const facture = await FactureService.createFacture(
      req.body,
      req.user._id,
    );
    res.status(201).json(facture);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }

}
async function getAll(req, res) {
  try {
    const { status, supplierId, page, limit } = req.query;
    const filters = { status, supplierId };

    const factures = await FactureService.getFactures(
      req.user._id,
      filters,
      Number(page) || 1,
      Number(limit) || 15
    );

    res.status(200).json(factures);
  } catch (error) {
    console.error(error);
    
    res.status(400).json({ message: error.message });
  }
}
async function update(req, res) {
  try {
    const facture = await FactureService.updateFacture(
      req.params.id,
      req.user._id,
      req.body
    );
    res.status(200).json(facture);
  } catch (error) {
    if (error.message === "Facture not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Forbidden") {
      return res.status(403).json({ message: error.message });
    }
    if (error.message.includes("totalement payée")) {
      return res.status(422).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
}

async function remove(req, res) {
  try {
    const result = await FactureService.deleteFacture(
      req.params.id,
      req.user._id
    );
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Facture not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Forbidden") {
      return res.status(403).json({ message: error.message });
    }
    if (error.message.includes("paiements associés")) {
      return res.status(422).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
}
module.exports = {
  create,
  getAll,
  update,
  remove
};
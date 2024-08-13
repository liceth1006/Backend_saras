import Beneficiary from "../models/beneficiariesModels.js";

export const readBeneficiary = async (req,res) => {
  try {
    const beneficiary = await Beneficiary.findAll();
    if (!beneficiary || beneficiary.length === 0) {
      return res.status(404).json({ error: "No se encontró información" });
    }
    return res.json(beneficiary);
  } catch (error) {
    console.error("Error al recuperar beneficiarios", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

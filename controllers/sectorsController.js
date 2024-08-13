import Sectors from "../models/sectorsModels.js";

export const readSectors = async (req,res) => {
  try {
    const sectors = await Sectors.findAll();
    if (!sectors || sectors.length === 0) {
      return res.status(404).json({ error: "No se encontró información" });
    }
    return res.json(sectors);
  } catch (error) {
    console.error("Error al recuperar beneficiarios", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

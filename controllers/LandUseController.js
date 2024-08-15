import LandUse from "../models/landUseModels.js";

export const readLandUses = async (req, res) => {
  try {
    const landUses = await LandUse.findAll();
    if (!landUses || landUses.length === 0) {
      return res.status(404).json({ error: "No se encontró información" });
    }
    return res.json(landUses);
  } catch (error) {
    console.error("Error al recuperar los usos de la tierra", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

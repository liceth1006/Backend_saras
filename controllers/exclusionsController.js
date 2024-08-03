import Exclusions from "../models/exclusionsModels.js";

export const readExclusions = async (req,res) => {
  try {
    const exclusions = await Exclusions.findAll();
    if (!exclusions || exclusions.length === 0) {
      return res.status(404).json({ error: "No se encontró información" });
    }
    return res.json(exclusions);
  } catch (error) {
    console.error("Error al recuperar exclusiones", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

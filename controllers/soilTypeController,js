import SoilType from "../models/soilTypeModels.js";

export const readSoilTypes = async (req, res) => {
  try {
    const soilTypes = await SoilType.findAll();
    if (!soilTypes || soilTypes.length === 0) {
      return res.status(404).json({ error: "No se encontró información" });
    }
    return res.json(soilTypes);
  } catch (error) {
    console.error("Error al recuperar los tipos de suelo", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

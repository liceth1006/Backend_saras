import Location from "../models/locationModels.js";

export const readLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    if (!locations || locations.length === 0) {
      return res.status(404).json({ error: "No se encontró información" });
    }
    return res.json(locations);
  } catch (error) {
    console.error("Error al recuperar ubicaciones", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

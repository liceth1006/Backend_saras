import ProjectTypes from "../models/projectTypesModels.js";

export const readProjectTypes = async (req,res) => {
  try {
    const projectTypes = await ProjectTypes.findAll();
    if (!projectTypes || projectTypes.length === 0) {
      return res.status(404).json({ error: "No se encontró información" });
    }
    return res.json(projectTypes);
  } catch (error) {
    console.error("Error al recuperar beneficiarios", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

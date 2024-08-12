import Project from "../models/projectModels.js";

export const readProject = async (req, res) => {
  try {
    const project = await Project.findAll();
    if (!project || project.length === 0) {
      return res.status(404).json({ error: "No se encontró información" });
    }
    return res.json(project);
  } catch (error) {
    console.error("Error al recuperar actividades", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};


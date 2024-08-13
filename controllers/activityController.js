import Activity from "../models/activitiesModels.js";

export const createActivity = async (req, res) => {
  const { acti_code, acti_name } = req.body;

  try {
    const newActivity = await Activity.create({
      acti_code,
      acti_name,
    });

    res.status(201).json(newActivity);
  } catch (error) {
    console.error("Error al crear la actividad 😰😭", error);
    res.status(500).json({ error: "No se pudo crear la actividad." });
  }
};

export const readActivity = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    if (!activities || activities.length === 0) {
      return res.status(404).json({ error: "No se encontró información" });
    }
    return res.json(activities);
  } catch (error) {
    console.error("Error al recuperar actividades", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

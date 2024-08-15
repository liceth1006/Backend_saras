import AreasOfInterest from "../models/areasOfInterestModels.js";

// Función para leer todas las áreas de interés
export const readAreasOfInterest = async (req, res) => {
  try {
    const areas = await AreasOfInterest.findAll();
    if (!areas || areas.length === 0) {
      return res.status(404).json({ error: "No se encontró información" });
    }
    return res.json(areas);
  } catch (error) {
    console.error("Error al recuperar áreas de interés", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// Función para leer una área de interés por ID
export const readAreaOfInterestById = async (req, res) => {
  const { id } = req.params;
  try {
    const area = await AreasOfInterest.findByPk(id);
    if (!area) {
      return res.status(404).json({ error: "Área de interés no encontrada" });
    }
    return res.json(area);
  } catch (error) {
    console.error("Error al recuperar área de interés", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// Función para crear una nueva área de interés
export const createAreaOfInterest = async (req, res) => {
  const { area_name } = req.body;
  try {
    const newArea = await AreasOfInterest.create({ area_name });
    return res.status(201).json(newArea);
  } catch (error) {
    console.error("Error al crear área de interés", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// Función para actualizar una área de interés por ID
export const updateAreaOfInterest = async (req, res) => {
  const { id } = req.params;
  const { area_name } = req.body;
  try {
    const area = await AreasOfInterest.findByPk(id);
    if (!area) {
      return res.status(404).json({ error: "Área de interés no encontrada" });
    }
    area.area_name = area_name || area.area_name;
    await area.save();
    return res.json(area);
  } catch (error) {
    console.error("Error al actualizar área de interés", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// Función para eliminar una área de interés por ID
export const deleteAreaOfInterest = async (req, res) => {
  const { id } = req.params;
  try {
    const area = await AreasOfInterest.findByPk(id);
    if (!area) {
      return res.status(404).json({ error: "Área de interés no encontrada" });
    }
    await area.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar área de interés", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

import TypeCategory from "../models/typeCategoryModels.js";

export const readTypeCategories = async (req, res) => {
  try {
    const typeCategories = await TypeCategory.findAll();
    if (!typeCategories || typeCategories.length === 0) {
      return res.status(404).json({ error: "No se encontró información" });
    }
    return res.json(typeCategories);
  } catch (error) {
    console.error("Error al recuperar las categorías de tipo", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

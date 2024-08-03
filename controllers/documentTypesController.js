import DocumentTypes from "../models/documentTypesModels.js";

export const readDocumentTypes = async (req, res) => {
  try {
    const documentTypes = await DocumentTypes.findAll();
    if (!documentTypes || documentTypes.length === 0) {
      return res.status(404).json("No se encontro tipos de documetos");
    }
    return res.json(documentTypes);
  } catch {
    console.error("Error al recuperar actividades", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

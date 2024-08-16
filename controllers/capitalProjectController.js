import CapitalProject from '../models/capitalProjectModels.js';
import BeneficiaryInformation from '../models/beneficiaryInformationModels.js';

export const postCapitalProject = async (req, res) => {
  const { bene_info_id } = req.body;

  try {
    // Validar que el campo bene_info_id esté presente
    if (!bene_info_id) {
      return res.status(400).json({ error: "El campo bene_info_id es requerido" });
    }

    // Verificar si el beneficiario existe
    const beneficiaryInformation = await BeneficiaryInformation.findOne({
      where: { bene_info_id }
    });

    if (!beneficiaryInformation) {
      return res.status(404).json({ error: "Información del beneficiario no encontrada para el bene_info_id proporcionado" });
    }

    // Crear el nuevo proyecto de capital
    const newCapitalProject = await CapitalProject.create({
      bene_info_id
    });

    console.log('Nuevo Proyecto de Capital:', newCapitalProject);

    return res.status(201).json({ success: true, capital_project_id: newCapitalProject.capital_project_id });
  
  } catch (error) {
    console.error("Error al guardar el proyecto de capital:", error);
    return res.status(500).json({ error: "Error al guardar el proyecto de capital", details: error });
  }
};

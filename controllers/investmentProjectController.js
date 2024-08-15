import InvestmentProject from '../models/investmentProjectModels.js';
import BeneficiaryInformation from '../models/beneficiaryInformationModels.js';

export const postInvestmentProject = async (req, res) => {
  const {
    bene_info_id,
    proj_description,
    phase,
    total_time,
    total_project_value,
    location_id,
    type_category_id,
    soil_type_id,
    land_use_id,
    estimated_execution_time,
    area_or_length,
    consultation_procedure,
    public_access_studies
  } = req.body;

  try {
    // Validar que todos los campos requeridos estén presentes
    if (!bene_info_id || !proj_description || !total_project_value || !location_id || !type_category_id || !soil_type_id || !land_use_id) {
      return res.status(400).json({ error: "Los campos bene_info_id, proj_description, total_project_value, location_id, type_category_id, soil_type_id y land_use_id son requeridos" });
    }

    // Verificar si el beneficiario existe
    const beneficiaryInformation = await BeneficiaryInformation.findOne({
      where: { bene_info_id }
    });

    if (!beneficiaryInformation) {
      return res.status(404).json({ error: "Información del beneficiario no encontrada para el bene_info_id proporcionado" });
    }

    // Crear el nuevo proyecto de inversión
    const newInvestmentProject = await InvestmentProject.create({
      bene_info_id,
      proj_description,
      phase,
      total_time,
      total_project_value,
      location_id,
      type_category_id,
      soil_type_id,
      land_use_id,
      estimated_execution_time,
      area_or_length,
      consultation_procedure,
      public_access_studies
    });

    console.log('Nuevo Proyecto de Inversión:', newInvestmentProject);

    return res.status(201).json({ success: true, investment_project_id: newInvestmentProject.investment_project_id });
  
  } catch (error) {
    console.error("Error al guardar el proyecto de inversión:", error);
    return res.status(500).json({ error: "Error al guardar el proyecto de inversión", details: error });
  }
};

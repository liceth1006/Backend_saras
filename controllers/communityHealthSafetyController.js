import CommunityHealthSafety from '../models/communityHealthSafetyModels.js'; 
import InvestmentProject from '../models/investmentProjectModels.js';

// Crear un nuevo registro de gestión ambiental
export const postCommunityHealthSafety = async (req, res) => {
  const {
    project_investment_id,
    avoids_chemicals_pesticides,
    avoids_air_contaminants_dust,
    avoids_dismantling_old_infrastructure,
    avoids_vehicle_movement,
    avoids_unqualified_security,
    trained_security_personnel,
    avoids_large_water_use,
    has_complaint_mechanism,
    avoids_unpleasant_odors,
    avoids_excessive_noise,
    has_community_engagement_mechanisms,
    takes_covid19_precautions
  } = req.body;

  try {
    // Verificar que todos los campos requeridos estén presentes
    if (
      !project_investment_id || 
      !avoids_chemicals_pesticides ||
      !avoids_air_contaminants_dust ||
      !avoids_dismantling_old_infrastructure ||
      !avoids_vehicle_movement ||
      !avoids_unqualified_security ||
      !trained_security_personnel ||
      !avoids_large_water_use ||
      !has_complaint_mechanism ||
      !avoids_unpleasant_odors ||
      !avoids_excessive_noise ||
      !has_community_engagement_mechanisms ||
      !takes_covid19_precautions
    ) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Verificar que el proyecto de inversión exista
    const investmentProject = await InvestmentProject.findOne({
      where: { investment_project_id: project_investment_id }
    });

    if (!investmentProject) {
      return res.status(404).json({ error: "Proyecto de inversión no encontrado para el ID proporcionado" });
    }

    // Crear nueva gestión ambiental
    const communityHealthSafety = await CommunityHealthSafety.create({
      project_investment_id,
      avoids_chemicals_pesticides,
      avoids_air_contaminants_dust,
      avoids_dismantling_old_infrastructure,
      avoids_vehicle_movement,
      avoids_unqualified_security,
      trained_security_personnel,
      avoids_large_water_use,
      has_complaint_mechanism,
      avoids_unpleasant_odors,
      avoids_excessive_noise,
      has_community_engagement_mechanisms,
      takes_covid19_precautions
    });

    console.log('New Environmental Management:', communityHealthSafety);

    return res.status(201).json({ success: true, health_safety_id: communityHealthSafety.health_safety_id });

  } catch (error) {
    console.error("Error al guardar la gestión ambiental:", error);
    return res.status(500).json({ error: "Error al guardar la gestión ambiental", details: error });
  }
};

// Obtener detalles de un registro de gestión ambiental por ID
export const getEnvironmentalManagementDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Asegúrate de que id es un número entero válido
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    // Buscar la gestión ambiental por ID
    const environmentalManagement = await CommunityHealthSafety.findOne({
      where: { health_safety_id: parsedId }
    });

    if (!environmentalManagement) {
      return res.status(404).json({ error: "Gestión ambiental no encontrada para el ID proporcionado" });
    }

    // Responde con los detalles de la gestión ambiental
    return res.json(environmentalManagement);
  } catch (error) {
    console.error("Error al recuperar los detalles de la gestión ambiental:", error.message);
    console.error("Stack trace:", error.stack);
    return res.status(500).json({ error: "Error del servidor", details: error.message });
  }
};

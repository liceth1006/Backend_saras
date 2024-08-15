import CommunityHealthSafety from '../models/communityHealthSafetyModels.js'; 
import InvestmentProject from '../models/investmentProjectModels.js';

// Crear un nuevo registro de salud y seguridad comunitaria
export const postCommunityHealthSafety = async (req, res) => {
  // Definir los campos requeridos
  const requiredFields = [
    'investment_project_id',
    'avoids_chemicals_pesticides',
    'avoids_air_contaminants_dust',
    'avoids_dismantling_old_infrastructure',
    'avoids_vehicle_movement',
    'avoids_unqualified_security',
    'trained_security_personnel',
    'avoids_large_water_use',
    'has_complaint_mechanism',
    'avoids_unpleasant_odors',
    'avoids_excessive_noise',
    'has_community_engagement_mechanisms',
    'takes_covid19_precautions'
  ];

  // Obtener los campos presentes en req.body
  const receivedFields = Object.keys(req.body);

  // Identificar los campos faltantes
  const missingFields = requiredFields.filter(field => !receivedFields.includes(field));

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Faltan los siguientes campos: ${missingFields.join(', ')}` });
  }

  const {
    investment_project_id,
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
    // Verificar que el proyecto de inversión exista
    const investmentProject = await InvestmentProject.findOne({
      where: { investment_project_id }
    });

    if (!investmentProject) {
      return res.status(404).json({ error: "Proyecto de inversión no encontrado para el ID proporcionado" });
    }

    // Crear nuevo registro de salud y seguridad comunitaria
    const newCommunityHealthSafety = await CommunityHealthSafety.create({
      investment_project_id,
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

    console.log('New Community Health and Safety Record:', newCommunityHealthSafety);

    return res.status(201).json({ success: true, health_safety_id: newCommunityHealthSafety.health_safety_id });

  } catch (error) {
    console.error("Error al guardar el registro de salud y seguridad comunitaria:", error);
    return res.status(500).json({ error: "Error al guardar el registro de salud y seguridad comunitaria", details: error });
  }
};


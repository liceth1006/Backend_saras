import EnvironmentalSocialImpactManagement from '../models/environmentalSocialImpactModels.js';
import InvestmentProject from '../models/investmentProjectModels.js';

// Crear una nueva gestión de impacto ambiental y social
export const postEnvironmentalSocialImpactManagement = async (req, res) => {
  const {
    project_investment_id,
    has_management_plan,
    impacts_on_water_air_soil,
    impacts_on_flora_fauna_landscape,
    impacts_on_social_labour
  } = req.body;

  try {
    // Verificar que todos los campos requeridos estén presentes
    if (
      !project_investment_id ||
      !has_management_plan ||
      !impacts_on_water_air_soil ||
      !impacts_on_flora_fauna_landscape ||
      !impacts_on_social_labour
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

    // Crear nueva gestión de impacto ambiental y social
    const newEnvironmentalSocialImpactManagement = await EnvironmentalSocialImpactManagement.create({
      project_investment_id,
      has_management_plan,
      impacts_on_water_air_soil,
      impacts_on_flora_fauna_landscape,
      impacts_on_social_labour
    });

    console.log('New Environmental Social Impact Management:', newEnvironmentalSocialImpactManagement);

    return res.status(201).json({ success: true, impact_management_id: newEnvironmentalSocialImpactManagement.impact_management_id });

  } catch (error) {
    console.error("Error al guardar la gestión de impacto ambiental y social:", error);
    return res.status(500).json({ error: "Error al guardar la gestión de impacto ambiental y social", details: error });
  }
};

// Obtener detalles de la gestión de impacto ambiental y social
export const getEnvironmentalSocialImpactManagementDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Asegúrate de que id es un número entero válido
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    // Buscar la gestión de impacto ambiental y social por ID
    const environmentalSocialImpactManagement = await EnvironmentalSocialImpactManagement.findOne({
      where: { impact_management_id: parsedId }
    });

    if (!environmentalSocialImpactManagement) {
      return res.status(404).json({ error: "Gestión de impacto ambiental y social no encontrada para el ID proporcionado" });
    }

    // Responde con los detalles de la gestión de impacto ambiental y social
    return res.json(environmentalSocialImpactManagement);
  } catch (error) {
    console.error("Error al recuperar los detalles de la gestión de impacto ambiental y social:", error.message);
    console.error("Stack trace:", error.stack);
    return res.status(500).json({ error: "Error del servidor", details: error.message });
  }
};

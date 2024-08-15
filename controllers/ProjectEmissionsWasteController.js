import ProjectEmissionsWaste from '../models/projectEmissionsWasteModels.js'; 
import InvestmentProject from '../models/investmentProjectModels.js';

// Crear un nuevo registro de emisiones y residuos del proyecto
export const postProjectEmissionsWaste = async (req, res) => {
  const {
    project_investment_id,  
    affected_by_natural_events,
    generates_air_emissions,
    measures_carbon_footprint,
    has_gei_reduction_measures,
    considers_climate_change_adaptation,
    generates_wastewater,
    measures_water_footprint,
    generates_hazardous_hospital_waste,
    generates_ordinary_demolition_waste,
    considers_historical_contamination,
    considers_resource_efficiency_indicators
  } = req.body;

  try {
    // Verificar que todos los campos requeridos estén presentes
    if (
      !project_investment_id || 
      !affected_by_natural_events ||
      !generates_air_emissions ||
      !measures_carbon_footprint ||
      !has_gei_reduction_measures ||
      !considers_climate_change_adaptation ||
      !generates_wastewater ||
      !measures_water_footprint ||
      !generates_hazardous_hospital_waste ||
      !generates_ordinary_demolition_waste ||
      !considers_historical_contamination ||
      !considers_resource_efficiency_indicators
    ) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Verificar que el proyecto de inversión exista
    const investmentProject = await InvestmentProject.findOne({
      where: { investment_project_id: project_investment_id } // Corregido aquí
    });

    if (!investmentProject) {
      return res.status(404).json({ error: "Proyecto de inversión no encontrado para el ID proporcionado" });
    }

    // Crear nuevo registro de emisiones y residuos del proyecto
    const newProjectEmissionsWaste = await ProjectEmissionsWaste.create({
      project_investment_id, // Corregido aquí
      affected_by_natural_events,
      generates_air_emissions,
      measures_carbon_footprint,
      has_gei_reduction_measures,
      considers_climate_change_adaptation,
      generates_wastewater,
      measures_water_footprint,
      generates_hazardous_hospital_waste,
      generates_ordinary_demolition_waste,
      considers_historical_contamination,
      considers_resource_efficiency_indicators
    });

    console.log('Nuevo registro de emisiones y residuos del proyecto:', newProjectEmissionsWaste);

    return res.status(201).json({ success: true, emissions_waste_id: newProjectEmissionsWaste.emissions_waste_id });

  } catch (error) {
    console.error("Error al guardar el registro de emisiones y residuos del proyecto:", error);
    return res.status(500).json({ error: "Error al guardar el registro de emisiones y residuos del proyecto", details: error.message });
  }
};

// Obtener los detalles de un registro de emisiones y residuos del proyecto por ID
export const getProjectEmissionsWasteDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el registro por ID
    const projectEmissionsWaste = await ProjectEmissionsWaste.findOne({
      where: { emissions_waste_id: id }
    });

    if (!projectEmissionsWaste) {
      return res.status(404).json({ error: "Registro de emisiones y residuos del proyecto no encontrado para el ID proporcionado" });
    }

    return res.status(200).json(projectEmissionsWaste);

  } catch (error) {
    console.error("Error al obtener los detalles del registro de emisiones y residuos del proyecto:", error);
    return res.status(500).json({ error: "Error al obtener los detalles del registro de emisiones y residuos del proyecto", details: error.message });
  }
};

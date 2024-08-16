import ProjectCapitalEmissions from '../models/projectCapitalEmissionsModels.js';
import CapitalProjects from '../models/capitalProjectModels.js'; 

// Crear un nuevo registro de emisiones de capital del proyecto
export const postProjectCapitalEmissions = async (req, res) => {
  const {
    capital_project_id,
    equipment_emissions,
    equipment_details,
    carbon_footprint,
    wastewater_disposal,
    treatment_required,
    hazardous_waste_generation,
    quantity_measured,
    respel_registration,
    hazardous_waste_management,
    ordinary_waste_management
  } = req.body;

  try {
    // Verificar que todos los campos requeridos estén presentes
    if (
      !capital_project_id ||
      !equipment_emissions ||
      !wastewater_disposal ||
      !treatment_required ||
      !hazardous_waste_generation ||
      !quantity_measured ||
      !respel_registration
    ) {
      return res.status(400).json({ error: "Todos los campos requeridos deben ser proporcionados" });
    }

    // Verificar que el proyecto de capital exista
    const capitalProject = await CapitalProjects.findOne({
      where: { capital_project_id }
    });

    if (!capitalProject) {
      return res.status(404).json({ error: "Proyecto de capital no encontrado para el ID proporcionado" });
    }

    // Crear nuevo registro de emisiones de capital del proyecto
    const newProjectCapitalEmissions = await ProjectCapitalEmissions.create({
      capital_project_id,
      equipment_emissions,
      equipment_details,
      carbon_footprint,
      wastewater_disposal,
      treatment_required,
      hazardous_waste_generation,
      quantity_measured,
      respel_registration,
      hazardous_waste_management,
      ordinary_waste_management
    });

    console.log('New Project Capital Emissions Record:', newProjectCapitalEmissions);

    return res.status(201).json({ success: true, project_capital_emissions_id: newProjectCapitalEmissions.project_capital_emissions_id });

  } catch (error) {
    console.error("Error al guardar el registro de emisiones de capital del proyecto:", error);
    return res.status(500).json({ error: "Error al guardar el registro de emisiones de capital del proyecto", details: error });
  }
};

import ProjectInputs from '../models/projectInputsModels.js';
import InvestmentProject from '../models/investmentProjectModels.js'

// Controlador para crear una nueva entrada en project_inputs
export const postProjectInputs = async (req, res) => {
  const {
    project_investment_id,
    water_source_for_project,
    water_source_for_workers,
    efficient_water_use_measures,
    uses_chemical_or_hazardous_products,
    uses_pesticides,
    requires_materials_from_quarries,
    type_of_lighting,
    energy_source,
    efficient_energy_use_measures,
    efficient_use_of_other_resources,
    integrates_clean_production_principles
  } = req.body;

  try {
    // Verificar que todos los campos requeridos estén presentes
    if (
      !project_investment_id || !water_source_for_project || !water_source_for_workers ||
      !efficient_water_use_measures || !uses_chemical_or_hazardous_products || !uses_pesticides ||
      !requires_materials_from_quarries || !type_of_lighting || !energy_source ||
      !efficient_energy_use_measures || !efficient_use_of_other_resources ||
      !integrates_clean_production_principles
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

    // Crear nueva entrada en project_inputs
    const newProjectInput = await ProjectInputs.create({
      project_investment_id,
      water_source_for_project,
      water_source_for_workers,
      efficient_water_use_measures,
      uses_chemical_or_hazardous_products,
      uses_pesticides,
      requires_materials_from_quarries,
      type_of_lighting,
      energy_source,
      efficient_energy_use_measures,
      efficient_use_of_other_resources,
      integrates_clean_production_principles
    });

    console.log('New Project Input:', newProjectInput);

    return res.status(201).json({ success: true, input_id: newProjectInput.input_id });

  } catch (error) {
    console.error("Error al guardar la entrada del proyecto:", error);
    return res.status(500).json({ error: "Error al guardar la entrada del proyecto", details: error });
  }
};

// Controlador para obtener los detalles de una entrada específica por su ID
export const getProjectInputDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Asegúrate de que id es un número entero válido
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    // Buscar la entrada del proyecto por ID
    const projectInput = await ProjectInputs.findOne({
      where: { input_id: parsedId }
    });

    if (!projectInput) {
      return res.status(404).json({ error: "Entrada del proyecto no encontrada para el ID proporcionado" });
    }

    // Responde con los detalles de la entrada del proyecto
    return res.json(projectInput);
  } catch (error) {
    console.error("Error al recuperar los detalles de la entrada del proyecto:", error.message);
    console.error("Stack trace:", error.stack);
    return res.status(500).json({ error: "Error del servidor", details: error.message });
  }
};

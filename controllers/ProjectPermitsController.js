import ProjectPermits from '../models/ProjectPermitsModels.js';
import InvestmentProject from '../models/investmentProjectModels.js';

// Crear un nuevo permiso de proyecto
export const postProjectPermits = async (req, res) => {
  const {
    project_investment_id,
    requires_environmental_diagnosis,
    requires_environmental_license,
    requires_other_permits
  } = req.body;

  try {
    // Verificar que todos los campos requeridos estén presentes
    if (
      !project_investment_id ||
      !requires_environmental_diagnosis ||
      !requires_environmental_license ||
      !requires_other_permits
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

    // Crear nuevo permiso de proyecto
    const newProjectPermits = await ProjectPermits.create({
      project_investment_id,
      requires_environmental_diagnosis,
      requires_environmental_license,
      requires_other_permits
    });

    console.log('New Project Permits:', newProjectPermits);

    return res.status(201).json({ success: true, permit_id: newProjectPermits.permit_id });

  } catch (error) {
    console.error("Error al guardar el permiso de proyecto:", error);
    return res.status(500).json({ error: "Error al guardar el permiso de proyecto", details: error });
  }
};

// Obtener detalles del permiso de proyecto
export const getProjectPermitsDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Asegúrate de que id es un número entero válido
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    // Buscar el permiso de proyecto por ID
    const projectPermits = await ProjectPermits.findOne({
      where: { permit_id: parsedId }
    });

    if (!projectPermits) {
      return res.status(404).json({ error: "Permiso de proyecto no encontrado para el ID proporcionado" });
    }

    // Responde con los detalles del permiso de proyecto
    return res.json(projectPermits);
  } catch (error) {
    console.error("Error al recuperar los detalles del permiso de proyecto:", error.message);
    console.error("Stack trace:", error.stack);
    return res.status(500).json({ error: "Error del servidor", details: error.message });
  }
};

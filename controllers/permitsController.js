import Permits from '../models/permitsModels.js';
import EnvironmentalPermits from '../models/EnvironmentalPermitsMoldes.js';
import CapitalProjects from '../models/capitalProjectModels.js'

// Crear un nuevo registro de permiso
export const postPermit = async (req, res) => {
  const {
    capital_project_id,
    perm_id,
    status,
    resolution_number,
    resolution_year,
    issuing_entity
  } = req.body;

  try {
    // Verificar que todos los campos requeridos estén presentes
    if (!capital_project_id || !perm_id || !status) {
      return res.status(400).json({ error: "Todos los campos requeridos deben ser proporcionados" });
    }

    // Verificar que el proyecto de capital exista
    const capitalProject = await CapitalProjects.findOne({
      where: { capital_project_id }
    });

    if (!capitalProject) {
      return res.status(404).json({ error: "Proyecto de capital no encontrado para el ID proporcionado" });
    }

    // Verificar que el permiso ambiental exista
    const environmentalPermit = await EnvironmentalPermits.findOne({
      where: { perm_id }
    });

    if (!environmentalPermit) {
      return res.status(404).json({ error: "Permiso ambiental no encontrado para el ID proporcionado" });
    }

    // Crear nuevo registro de permiso
    const newPermit = await Permits.create({
      capital_project_id,
      perm_id,
      status,
      resolution_number,
      resolution_year,
      issuing_entity
    });

    console.log('New Permit Record:', newPermit);

    return res.status(201).json({ success: true, permit_id: newPermit.permit_id });

  } catch (error) {
    console.error("Error al guardar el registro del permiso:", error);
    return res.status(500).json({ error: "Error al guardar el registro del permiso", details: error });
  }
};

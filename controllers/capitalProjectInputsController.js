import CapitalProjectInputs from '../models/CapitalProjectInputsModels.js';
import CapitalProjects from '../models/capitalProjectModels.js'; 

// Crear un nuevo registro de entradas del proyecto de capital
export const postCapitalProjectInputs = async (req, res) => {
  const {
    capital_project_id,
    water_source_for_activities,
    water_treatment_for_activities,
    water_source_for_consumption,
    water_treatment_for_consumption,
    chemicals_use,
    chemicals_details,
    chemical_storage_safety,
    energy_source,
    lighting_type
  } = req.body;

  try {
    // Verificar que todos los campos requeridos estén presentes
    if (!capital_project_id) {
      return res.status(400).json({ error: "El campo 'capital_project_id' es requerido" });
    }

    // Verificar que el proyecto de capital exista
    const capitalProject = await CapitalProjects.findOne({
      where: { capital_project_id }
    });

    if (!capitalProject) {
      return res.status(404).json({ error: "Proyecto de capital no encontrado para el ID proporcionado" });
    }

    // Crear nuevo registro de entradas del proyecto de capital
    const newCapitalProjectInputs = await CapitalProjectInputs.create({
      capital_project_id,
      water_source_for_activities,
      water_treatment_for_activities,
      water_source_for_consumption,
      water_treatment_for_consumption,
      chemicals_use,
      chemicals_details,
      chemical_storage_safety,
      energy_source,
      lighting_type
    });

    console.log('Nuevo registro de entradas del proyecto de capital:', newCapitalProjectInputs);

    return res.status(201).json({ success: true, capital_project_inputs_id: newCapitalProjectInputs.capital_project_inputs_id });

  } catch (error) {
    console.error("Error al guardar el registro de entradas del proyecto de capital:", error);
    return res.status(500).json({ error: "Error al guardar el registro de entradas del proyecto de capital", details: error });
  }
};

// Obtener un registro de entradas del proyecto de capital por ID
export const getCapitalProjectInputsById = async (req, res) => {
  const { id } = req.params;

  try {
    const capitalProjectInputs = await CapitalProjectInputs.findOne({
      where: { capital_project_inputs_id: id }
    });

    if (!capitalProjectInputs) {
      return res.status(404).json({ error: "Registro de entradas del proyecto de capital no encontrado para el ID proporcionado" });
    }

    return res.status(200).json(capitalProjectInputs);

  } catch (error) {
    console.error("Error al obtener el registro de entradas del proyecto de capital:", error);
    return res.status(500).json({ error: "Error al obtener el registro de entradas del proyecto de capital", details: error });
  }
};

// Actualizar un registro de entradas del proyecto de capital por ID
export const updateCapitalProjectInputsById = async (req, res) => {
  const { id } = req.params;
  const {
    water_source_for_activities,
    water_treatment_for_activities,
    water_source_for_consumption,
    water_treatment_for_consumption,
    chemicals_use,
    chemicals_details,
    chemical_storage_safety,
    energy_source,
    lighting_type
  } = req.body;

  try {
    const capitalProjectInputs = await CapitalProjectInputs.findOne({
      where: { capital_project_inputs_id: id }
    });

    if (!capitalProjectInputs) {
      return res.status(404).json({ error: "Registro de entradas del proyecto de capital no encontrado para el ID proporcionado" });
    }

    // Actualizar el registro de entradas del proyecto de capital
    await capitalProjectInputs.update({
      water_source_for_activities,
      water_treatment_for_activities,
      water_source_for_consumption,
      water_treatment_for_consumption,
      chemicals_use,
      chemicals_details,
      chemical_storage_safety,
      energy_source,
      lighting_type
    });

    return res.status(200).json({ success: true, message: "Registro de entradas del proyecto de capital actualizado exitosamente" });

  } catch (error) {
    console.error("Error al actualizar el registro de entradas del proyecto de capital:", error);
    return res.status(500).json({ error: "Error al actualizar el registro de entradas del proyecto de capital", details: error });
  }
};

// Eliminar un registro de entradas del proyecto de capital por ID
export const deleteCapitalProjectInputsById = async (req, res) => {
  const { id } = req.params;

  try {
    const capitalProjectInputs = await CapitalProjectInputs.findOne({
      where: { capital_project_inputs_id: id }
    });

    if (!capitalProjectInputs) {
      return res.status(404).json({ error: "Registro de entradas del proyecto de capital no encontrado para el ID proporcionado" });
    }

    // Eliminar el registro de entradas del proyecto de capital
    await capitalProjectInputs.destroy();

    return res.status(200).json({ success: true, message: "Registro de entradas del proyecto de capital eliminado exitosamente" });

  } catch (error) {
    console.error("Error al eliminar el registro de entradas del proyecto de capital:", error);
    return res.status(500).json({ error: "Error al eliminar el registro de entradas del proyecto de capital", details: error });
  }
};

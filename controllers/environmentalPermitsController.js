import EnvironmentalPermits from '../models/EnvironmentalPermitsMoldes.js';

// Leer todos los permisos ambientales
export const readEnvironmentalPermits = async (req, res) => {
  try {
    const environmentalPermits = await EnvironmentalPermits.findAll();
    if (!environmentalPermits || environmentalPermits.length === 0) {
      return res.status(404).json({ error: "No se encontraron permisos ambientales" });
    }
    return res.json(environmentalPermits);
  } catch (error) {
    console.error("Error al recuperar los permisos ambientales", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// Leer un permiso ambiental específico por ID
export const readEnvironmentalPermitById = async (req, res) => {
  const { id } = req.params;

  try {
    const environmentalPermit = await EnvironmentalPermits.findOne({
      where: { perm_id: id }
    });

    if (!environmentalPermit) {
      return res.status(404).json({ error: "Permiso ambiental no encontrado" });
    }

    return res.json(environmentalPermit);
  } catch (error) {
    console.error("Error al recuperar el permiso ambiental", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// Crear un nuevo permiso ambiental
export const postEnvironmentalPermit = async (req, res) => {
  const { perm_name } = req.body;

  try {
    // Verificar que todos los campos requeridos estén presentes
    if (!perm_name) {
      return res.status(400).json({ error: "El nombre del permiso ambiental es requerido" });
    }

    // Crear nuevo permiso ambiental
    const newEnvironmentalPermit = await EnvironmentalPermits.create({
      perm_name
    });

    console.log('New Environmental Permit Record:', newEnvironmentalPermit);

    return res.status(201).json({ success: true, perm_id: newEnvironmentalPermit.perm_id });
  } catch (error) {
    console.error("Error al guardar el permiso ambiental", error);
    return res.status(500).json({ error: "Error al guardar el permiso ambiental", details: error });
  }
};

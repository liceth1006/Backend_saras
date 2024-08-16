import comitments from '../models/comitmentsModels.js';


// Función para crear un nuevo compromiso
export const createCommitment = async (req, res) => {
  const { comitID, projectID, description, estatus, due_date } = req.body;
  try {
    const newCommitment = await comitments.create({
      comitID,
      projectID,
      description,
      estatus,
      due_date,
    });
    return res.status(201).json(newCommitment);
  } catch (error) {
    console.error("Error al crear el compromiso", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// Función para obtener todos los compromisos
export const readCommitments = async (req, res) => {
  try {
    const commitments = await comitments.findAll();
    return res.status(200).json(commitments);
  } catch (error) {
    console.error("Error al obtener los compromisos", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};


// Función para actualizar un compromiso por ID
export const updateCommitment = async (req, res) => {
  const { comitID } = req.params;
  const { projectID, description, estatus, due_date } = req.body;
  try {
    const [updated] = await comitments.update(
      { projectID, description, estatus, due_date },
      { where: { comitID } }
    );
    if (updated) {
      return res.status(200).json({ message: "Compromiso actualizado correctamente" });
    } else {
      return res.status(404).json({ error: "Compromiso no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el compromiso", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// Función para eliminar un compromiso por ID
export const deleteCommitment = async (req, res) => {
  const { comitID } = req.params;
  try {
    const deleted = await comitments.destroy({ where: { comitID } });
    if (deleted) {
      return res.status(200).json({ message: "Compromiso eliminado correctamente" });
    } else {
      return res.status(404).json({ error: "Compromiso no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el compromiso", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};


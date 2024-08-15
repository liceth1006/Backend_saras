import EnvironmentalManagement from '../models/EnvironmentalManagementModels.js';
import InvestmentProject from '../models/investmentProjectModels.js';

export const postEnvironmentalManagement = async (req, res) => {
  const {
    investment_project_id,
    environmental_management_department,
    responsible_staff,
    policies_guidelines,
    iso_certifications,
    legal_matrix,
    identified_impacts,
    complaints_mechanism,
    complies_with_regulations,
    environmental_supervision,
    public_communication,
    emergency_situations,
    sanctioned,
    environmental_liabilities,
    complaints
  } = req.body;

  try {
    // Verificar que todos los campos requeridos estén presentes
    if (
       !investment_project_id || !environmental_management_department || !responsible_staff ||
      !policies_guidelines || !iso_certifications || !legal_matrix || !identified_impacts || !complaints_mechanism ||
      !complies_with_regulations || !environmental_supervision || !public_communication || !emergency_situations ||
      !sanctioned || !environmental_liabilities || !complaints
    ) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Verificar que el proyecto de inversión exista
    const investmentProject = await InvestmentProject.findOne({
      where: { investment_project_id }
    });

    if (!investmentProject) {
      return res.status(404).json({ error: "Proyecto de inversión no encontrado para el ID proporcionado" });
    }

    // Crear nueva gestión ambiental
    const newEnvironmentalManagement = await EnvironmentalManagement.create({
      investment_project_id,
      environmental_management_department,
      responsible_staff,
      policies_guidelines,
      iso_certifications,
      legal_matrix,
      identified_impacts,
      complaints_mechanism,
      complies_with_regulations,
      environmental_supervision,
      public_communication,
      emergency_situations,
      sanctioned,
      environmental_liabilities,
      complaints
    });

    console.log('New Environmental Management:', newEnvironmentalManagement);

    return res.status(201).json({ success: true, environmental_management_id: newEnvironmentalManagement.environmental_management_id });

  } catch (error) {
    console.error("Error al guardar la gestión ambiental:", error);
    return res.status(500).json({ error: "Error al guardar la gestión ambiental", details: error });
  }
};

export const getEnvironmentalManagementDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Asegúrate de que id es un número entero válido
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    // Buscar la gestión ambiental por ID
    const environmentalManagement = await EnvironmentalManagement.findOne({
      where: { environmental_management_id: parsedId }
    });

    if (!environmentalManagement) {
      return res.status(404).json({ error: "Gestión ambiental no encontrada para el ID proporcionado" });
    }

    // Responde con los detalles de la gestión ambiental
    return res.json(environmentalManagement);
  } catch (error) {
    console.error("Error al recuperar los detalles de la gestión ambiental:", error.message);
    console.error("Stack trace:", error.stack);
    return res.status(500).json({ error: "Error del servidor", details: error.message });
  }
};

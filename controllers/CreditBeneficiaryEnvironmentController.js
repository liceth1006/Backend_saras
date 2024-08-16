import CreditBeneficiaryEnvironmentalInfo from '../models/CreditBeneficiaryEnvironmentModels.js'; 
import CapitalProjects from '../models/capitalProjectModels.js'; 
// Crear un nuevo registro de información ambiental del beneficiario
export const postCreditBeneficiaryEnvironmentalInfo = async (req, res) => {
  const {
    capital_project_id,
    debt_substitution,
    has_environmental_department,
    has_environmental_policies,
    environmental_certifications,
    known_impacts,
    environmental_programs,
    legal_requirements_documented,
    public_communication,
    public_communication_details,
    supervision_activities,
    accident_emergency_management,
    labor_norms_compliance,
    grievance_mechanism,
    environmental_liabilities
  } = req.body;

  try {
    // Verificar que todos los campos requeridos estén presentes
    if (
      !capital_project_id ||
      !has_environmental_department ||
      !has_environmental_policies ||
      !legal_requirements_documented ||
      !public_communication ||
      !supervision_activities ||
      !accident_emergency_management ||
      !labor_norms_compliance ||
      !grievance_mechanism
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

    // Crear nuevo registro de información ambiental del beneficiario
    const newEnvironmentalInfo = await CreditBeneficiaryEnvironmentalInfo.create({
      capital_project_id,
      debt_substitution,
      has_environmental_department,
      has_environmental_policies,
      environmental_certifications,
      known_impacts,
      environmental_programs,
      legal_requirements_documented,
      public_communication,
      public_communication_details,
      supervision_activities,
      accident_emergency_management,
      labor_norms_compliance,
      grievance_mechanism,
      environmental_liabilities
    });

    console.log('New Environmental Info Record:', newEnvironmentalInfo);

    return res.status(201).json({ success: true, beneficiary_info_id: newEnvironmentalInfo.beneficiary_info_id });

  } catch (error) {
    console.error("Error al guardar el registro de información ambiental del beneficiario:", error);
    return res.status(500).json({ error: "Error al guardar el registro de información ambiental del beneficiario", details: error });
  }
};

import LaborConditions from '../models/laborConditionsModel.js'; // Asegúrate de que la ruta sea correcta
import BeneficiaryInformation from '../models/beneficiaryInformationModels.js'; // Asegúrate de que la ruta sea correcta

// Crear un nuevo registro de condiciones laborales
export const postLaborConditions = async (req, res) => {
  const {
    bene_info_id,
    hiring_non_discriminatory,
    equal_labor_conditions,
    workers_know_rights,
    training_program,
    temporary_workers_min_salary,
    respect_union_agreements,
    foreign_workers_equal_conditions,
    accommodation_services_verified,
    forced_labor_trafficking_check,
    age_verification,
    child_labor_risk_management,
    work_permits_usage,
    pqr_mechanism,
    avoids_mass_terminations,
    individual_termination_compliance,
    accidents_incidents_recorded,
    workers_affiliated,
    workers_know_safety_hazards,
    emergency_procedures,
    emergency_instructions_clear,
    sg_sst_compliant
  } = req.body;

  try {
    // Verificar que todos los campos requeridos estén presentes
    if (
      !bene_info_id ||
      !hiring_non_discriminatory ||
      !equal_labor_conditions ||
      !workers_know_rights ||
      !training_program ||
      !temporary_workers_min_salary ||
      !respect_union_agreements ||
      !foreign_workers_equal_conditions ||
      !accommodation_services_verified ||
      !forced_labor_trafficking_check ||
      !age_verification ||
      !child_labor_risk_management ||
      !work_permits_usage ||
      !pqr_mechanism ||
      !avoids_mass_terminations ||
      !individual_termination_compliance ||
      !accidents_incidents_recorded ||
      !workers_affiliated ||
      !workers_know_safety_hazards ||
      !emergency_procedures ||
      !emergency_instructions_clear ||
      !sg_sst_compliant
    ) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Verificar que la información de beneficiario exista
    const beneficiary = await BeneficiaryInformation.findOne({
      where: { bene_info_id }
    });

    if (!beneficiary) {
      return res.status(404).json({ error: "Información de beneficiario no encontrada para el ID proporcionado" });
    }

    // Crear nuevo registro de condiciones laborales
    const newLaborConditions = await LaborConditions.create({
      bene_info_id,
      hiring_non_discriminatory,
      equal_labor_conditions,
      workers_know_rights,
      training_program,
      temporary_workers_min_salary,
      respect_union_agreements,
      foreign_workers_equal_conditions,
      accommodation_services_verified,
      forced_labor_trafficking_check,
      age_verification,
      child_labor_risk_management,
      work_permits_usage,
      pqr_mechanism,
      avoids_mass_terminations,
      individual_termination_compliance,
      accidents_incidents_recorded,
      workers_affiliated,
      workers_know_safety_hazards,
      emergency_procedures,
      emergency_instructions_clear,
      sg_sst_compliant
    });

    console.log('New Labor Conditions Record:', newLaborConditions);

    return res.status(201).json({ success: true, labor_conditions_id: newLaborConditions.labor_conditions_id });

  } catch (error) {
    console.error("Error al guardar el registro de condiciones laborales:", error);
    return res.status(500).json({ error: "Error al guardar el registro de condiciones laborales", details: error });
  }
};

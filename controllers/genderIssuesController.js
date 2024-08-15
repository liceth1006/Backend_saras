import GenderIssues from '../models/genderIssuesModels.js'; 
import BeneficiaryInformation from '../models/beneficiaryInformationModels.js'; // Asegúrate de que la ruta sea correcta

// Crear un nuevo registro de problemas de género
export const postGenderIssues = async (req, res) => {
  const {
    bene_info_id,
    discriminates_gender_benefits,
    sexual_abuse_reports,
    sexual_harassment_reports,
    discrimination_against_women_reports,
    discrimination_orientation_gender_reports,
    sexual_exploitation_reports,
    lacks_gender_equality_policies
  } = req.body;

  try {
    // Verificar que todos los campos requeridos estén presentes
    if (
      !bene_info_id ||
      !discriminates_gender_benefits ||
      !sexual_abuse_reports ||
      !sexual_harassment_reports ||
      !discrimination_against_women_reports ||
      !discrimination_orientation_gender_reports ||
      !sexual_exploitation_reports ||
      !lacks_gender_equality_policies
    ) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Verificar que la información de beneficiario exista
    const beneficiaryInformation = await BeneficiaryInformation.findOne({
      where: { bene_info_id }
    });

    if (!beneficiaryInformation) {
      return res.status(404).json({ error: "Información de beneficiario no encontrada para el ID proporcionado" });
    }

    // Crear nuevo registro de problemas de género
    const newGenderIssues = await GenderIssues.create({
      bene_info_id,
      discriminates_gender_benefits,
      sexual_abuse_reports,
      sexual_harassment_reports,
      discrimination_against_women_reports,
      discrimination_orientation_gender_reports,
      sexual_exploitation_reports,
      lacks_gender_equality_policies
    });

    console.log('New Gender Issues Record:', newGenderIssues);

    return res.status(201).json({ success: true, gender_issues_id: newGenderIssues.gender_issues_id });

  } catch (error) {
    console.error("Error al guardar el registro de problemas de género:", error);
    return res.status(500).json({ error: "Error al guardar el registro de problemas de género", details: error });
  }
};

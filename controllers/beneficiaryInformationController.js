import sequelize from '../database/connectdb.js';
import BeneficiaryInformation from '../models/beneficiaryInformationModels.js'
import Person from "../models/personModels.js";
import Beneficiary from "../models/beneficiariesModels.js";

export const getBeneficiaryDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    // Asegúrate de que userId es un número entero válido
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }

    // Ejecuta el procedimiento almacenado
    const results = await sequelize.query('CALL GetBeneficiaryDetails(:userId)', {
      replacements: { userId: parsedUserId },
    });

    // Verifica si hay resultados y maneja la estructura del resultado adecuadamente
    if (!results || results.length === 0) {
      return res.status(404).json({ error: "No se encontró información para el usuario proporcionado" });
    }

    // Responde con los resultados
    return res.json(results);
  } catch (error) {
    console.error("Error al recuperar los detalles del beneficiario:", error.message);
    console.error("Stack trace:", error.stack);
    return res.status(500).json({ error: "Error del servidor", details: error.message });
  }
};


export const postBeneficiaryInformation = async (req, res) => {
  const { use_id, main_activity_id, hasExclusion, exc_id, company_name, company_description, resources, sector_id, project_types_id,credit_value } = req.body;

  try {
    // Verifica si todos los campos requeridos están presentes
    if (
        !use_id ||
        !main_activity_id ||
        !company_name ||
        !company_description ||
        !resources ||
        !sector_id ||
        !project_types_id ||
      !credit_value) {
      return res.status(400).json({ error: "Todos los campos son requeridos excepto exclusión" });
    }

    // Obtener el bene_id dado un use_id
    const person = await Person.findOne({
      where: { use_id },
      attributes: ['per_id']  // Selecciona el per_id necesario para buscar en Beneficiaries
    });

    if (!person) {
      return res.status(404).json({ error: "Persona no encontrada para el use_id proporcionado" });
    }

    const beneficiary = await Beneficiary.findOne({
      where: { per_id: person.per_id },
      attributes: ['bene_id']
    });

    if (!beneficiary) {
      return res.status(404).json({ error: "Beneficiario no encontrado para la persona con el use_id proporcionado" });
    }

    const bene_id = beneficiary.bene_id;

    // Manejar la lógica de exclusión
    let exclusionId = null;
    if (hasExclusion === '1') {
      exclusionId = exc_id && !isNaN(parseInt(exc_id)) ? parseInt(exc_id) : null;
    } else if (hasExclusion === '2') {
      exclusionId = null; // Ninguna exclusión
    } else {
      return res.status(400).json({ error: "Valor para '¿Tiene exclusión?' no válido" });
    }

    // Crear el registro en la base de datos
    await BeneficiaryInformation.create({
      main_activity_id,
      exc_id: exclusionId,
      bene_id,
      company_name,
      company_description,
      resources,
      sector_id,
      project_types_id,
      credit_value
    });

    return res.status(201).json({ success: true });

  } catch (error) {
    console.error("Error al guardar la información del beneficiario:", error);
    return res.status(500).json({ error: "Error al guardar la información del beneficiario" });
  }
};
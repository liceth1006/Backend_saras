import sequelize from '../database/connectdb.js';
import BeneficiaryInformation from '../models/beneficiaryInformationModels.js';
import Person from '../models/personModels.js';
import Beneficiary from '../models/beneficiariesModels.js';
import CapitalProject from '../models/capitalProjectModels.js';
import InvestmentProject from '../models/investmentProjectModels.js';

export const postBeneficiaryInformation = async (req, res) => {
  const { use_id, main_activity_id, hasExclusion, exc_id, company_name, company_description, resources, sector_id, credit_value } = req.body;

  try {
    if (!use_id || !main_activity_id || !company_name || !company_description || !resources || !sector_id ||  !credit_value) {
      return res.status(400).json({ error: "Todos los campos son requeridos excepto exclusión" });
    }

    const person = await Person.findOne({
      where: { use_id },
      attributes: ['per_id']
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

    let exclusionId = null;
    if (hasExclusion === '1') {
      exclusionId = exc_id && !isNaN(parseInt(exc_id)) ? parseInt(exc_id) : null;
    } else if (hasExclusion === '2') {
      exclusionId = null;
    } else {
      return res.status(400).json({ error: "Valor para '¿Tiene exclusión?' no válido" });
    }

    const newBeneficiaryInformation = await BeneficiaryInformation.create({
      main_activity_id,
      exc_id: exclusionId,
      bene_id,
      company_name,
      company_description,
      resources,
      sector_id,
      credit_value
    });

    console.log('New Beneficiary Information:', newBeneficiaryInformation);


    return res.status(201).json({ success: true, bene_info_id: newBeneficiaryInformation.bene_info_id });

  } catch (error) {
    console.error("Error al guardar la información del beneficiario:", error);
    return res.status(500).json({ error: "Error al guardar la información del beneficiario", error });
  }
};



export const getBeneficiaryDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    // Asegúrate de que userId es un número entero válido
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }

    // Ejecuta el procedimiento almacenado
    const results = await sequelize.query('CALL obtener_beneficiarios(:userId)', {
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

export const getBeneficiaryAll = async (req, res) => {
  try {
    // Ejecuta el procedimiento almacenado
    const results = await sequelize.query('CALL obtener_beneficiarios_todos()', {
     
    });
console.log(results)
console.log("Tipo de results:", typeof results);
    // Verifica si hay resultados y maneja la estructura del resultado adecuadamente
    if (!results || results.length === 0) {
      return res.status(404).json({ error: "No se encontró información" });
    }

    // Responde con todos los resultados
    return res.json(results);
  } catch (error) {
    console.error("Error al recuperar los detalles del beneficiario:", error.message);
    console.error("Stack trace:", error.stack);
    return res.status(500).json({ error: "Error del servidor", details: error.message });
  }
};

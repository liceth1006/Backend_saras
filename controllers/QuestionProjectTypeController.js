import sequelize from '../database/connectdb.js';
import BeneficiaryInformation from '../models/beneficiaryInformationModels.js';
import QuestionProjectType from '../models/QuestionProjectTypeModels.js';

export const getQuestionProjectTypeDetails = async (req, res) => {
  const { bene_info_id } = req.body;

  try {
    // Asegúrate de que bene_info_id es un número entero válido
    const parsedBeneId = parseInt(bene_info_id, 10);
    if (isNaN(parsedBeneId)) {
      return res.status(400).json({ error: "ID de beneficiario inválido" });
    }

    // Ejecuta el procedimiento almacenado
    const [results] = await sequelize.query('CALL GetQuestionsByBeneficiary(:bene_info_id)', {
      replacements: { bene_info_id: parsedBeneId },
      type: sequelize.QueryTypes.SELECT
    });

    // Verifica si hay resultados y maneja la estructura del resultado adecuadamente
    if (!results || results.length === 0) {
      return res.status(404).json({ error: "No se encontró información para el beneficiario proporcionado" });
    }

    // Responde con los resultados
    return res.json(results);
  } catch (error) {
    console.error("Error al recuperar los detalles del beneficiario:", error.message);
    console.error("Stack trace:", error.stack);
    return res.status(500).json({ error: "Error del servidor", details: error.message });
  }
};

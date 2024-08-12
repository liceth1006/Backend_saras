import sequelize from '../database/connectdb.js';

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

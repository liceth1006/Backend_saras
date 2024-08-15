import sequelize from '../database/connectdb.js';
import ProjectAreas from '../models/projectAreasModels.js';
import InvestmentProject from '../models/investmentProjectModels.js'; 
import AreasOfInterest from '../models/areasOfInterestModels.js'; 

export const postProjectArea = async (req, res) => {
  const { investment_project_id, area_id } = req.body;

  try {
    // Verifica que los campos requeridos estén presentes
    if (!investment_project_id || !area_id) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Verifica si el proyecto de inversión existe
    const investmentProject = await InvestmentProject.findByPk(investment_project_id);
    if (!investmentProject) {
      return res.status(404).json({ error: "Proyecto de inversión no encontrado para el ID proporcionado" });
    }

    // Verifica si el área de interés existe
    const area = await AreasOfInterest.findByPk(area_id);
    if (!area) {
      return res.status(404).json({ error: "Área de interés no encontrada para el ID proporcionado" });
    }

    // Crea un nuevo registro en project_areas
    const newProjectArea = await ProjectAreas.create({
      investment_project_id,
      area_id
    });

    console.log('New Project Area:', newProjectArea);

    return res.status(201).json({ success: true, message: 'Área de proyecto creada con éxito', project_area_id: newProjectArea.investment_project_id });

  } catch (error) {
    console.error("Error al guardar el área del proyecto:", error);
    return res.status(500).json({ error: "Error al guardar el área del proyecto", error });
  }
};

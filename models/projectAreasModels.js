// Importa las dependencias necesarias
import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js'; 

// Define el modelo para la tabla project_areas
const ProjectAreas = sequelize.define('ProjectAreas', {
  investment_project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'project_areas',
  timestamps: false, 
});

// Exporta el modelo para su uso en otros archivos
export default ProjectAreas;

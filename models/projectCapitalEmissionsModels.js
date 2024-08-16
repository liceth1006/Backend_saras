import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const ProjectCapitalEmissions = sequelize.define('ProjectCapitalEmissions', {
  project_capital_emissions_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  capital_project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'capital_projects', 
      key: 'capital_project_id'
    }
  },
  equipment_emissions: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: true,
    defaultValue: 'Not Applicable'
  },
  equipment_details: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  carbon_footprint: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  wastewater_disposal: {
    type: DataTypes.ENUM('Alcantarillado público', 'Al suelo', 'Cuerpo de agua', 'No se generan'),
    allowNull: true,
    defaultValue: 'No se generan'
  },
  treatment_required: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: true,
    defaultValue: 'Not Applicable'
  },
  hazardous_waste_generation: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: true,
    defaultValue: 'Not Applicable'
  },
  quantity_measured: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: true,
    defaultValue: 'Not Applicable'
  },
  respel_registration: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: true,
    defaultValue: 'Not Applicable'
  },
  hazardous_waste_management: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ordinary_waste_management: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'project_capital_emissions',
  timestamps: false
});

export default ProjectCapitalEmissions;

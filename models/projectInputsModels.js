import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const ProjectInputs = sequelize.define('ProjectInputs', {
  input_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  project_investment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'investment_projects', 
      key: 'investment_project_id'
    }
  },
  water_source_for_project: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  water_source_for_workers: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  efficient_water_use_measures: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  uses_chemical_or_hazardous_products: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  uses_pesticides: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  requires_materials_from_quarries: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  type_of_lighting: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  energy_source: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  efficient_energy_use_measures: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  efficient_use_of_other_resources: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  integrates_clean_production_principles: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  }
}, {
  tableName: 'project_inputs',
  timestamps: false
});

export default ProjectInputs;

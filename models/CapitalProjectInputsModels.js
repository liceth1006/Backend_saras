import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const CapitalProjectInputs = sequelize.define('CapitalProjectInputs', {
  capital_project_inputs_id: {
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
  water_source_for_activities: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  water_treatment_for_activities: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: true,
    defaultValue: 'Not Applicable'
  },
  water_source_for_consumption: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  water_treatment_for_consumption: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: true,
    defaultValue: 'Not Applicable'
  },
  chemicals_use: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: true,
    defaultValue: 'Not Applicable'
  },
  chemicals_details: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  chemical_storage_safety: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: true,
    defaultValue: 'Not Applicable'
  },
  energy_source: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  lighting_type: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'capital_project_inputs',
  timestamps: false
});

export default CapitalProjectInputs;

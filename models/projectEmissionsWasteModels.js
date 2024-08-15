import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const ProjectEmissionsWaste = sequelize.define('ProjectEmissionsWaste', {
  emissions_waste_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  project_investment_id: { // Corregido aquí
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'investment_projects', 
      key: 'investment_project_id'
    }
  },
  affected_by_natural_events: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: false
  },
  generates_air_emissions: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: false
  },
  measures_carbon_footprint: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: false
  },
  has_gei_reduction_measures: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: false
  },
  considers_climate_change_adaptation: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: false
  },
  generates_wastewater: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: false
  },
  measures_water_footprint: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: false
  },
  generates_hazardous_hospital_waste: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: false
  },
  generates_ordinary_demolition_waste: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: false
  },
  considers_historical_contamination: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: false
  },
  considers_resource_efficiency_indicators: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: false
  }
}, {
  tableName: 'project_emissions_waste',
  timestamps: false
});

export default ProjectEmissionsWaste;

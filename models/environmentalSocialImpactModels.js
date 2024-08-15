import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const EnvironmentalSocialImpactManagement = sequelize.define('EnvironmentalSocialImpactManagement', {
  impact_management_id: {
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
  has_management_plan: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  impacts_on_water_air_soil: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  impacts_on_flora_fauna_landscape: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  impacts_on_social_labour: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  }
}, {
  tableName: 'environmental_social_impact_management',
  timestamps: false
});

export default EnvironmentalSocialImpactManagement;

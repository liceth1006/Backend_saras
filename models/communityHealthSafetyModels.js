import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const CommunityHealthSafety = sequelize.define('CommunityHealthSafety', {
  health_safety_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  investment_project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'investment_projects', 
      key: 'investment_project_id'
    }
  },
  avoids_chemicals_pesticides: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  avoids_air_contaminants_dust: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  avoids_dismantling_old_infrastructure: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  avoids_vehicle_movement: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  avoids_unqualified_security: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  trained_security_personnel: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  avoids_large_water_use: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  has_complaint_mechanism: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  avoids_unpleasant_odors: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  avoids_excessive_noise: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  has_community_engagement_mechanisms: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  takes_covid19_precautions: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  }
}, {
  tableName: 'community_health_safety',
  timestamps: false
});

export default CommunityHealthSafety;

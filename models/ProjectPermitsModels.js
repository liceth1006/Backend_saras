import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const ProjectPermits = sequelize.define('ProjectPermits', {
  permit_id: {
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
  requires_environmental_diagnosis: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  requires_environmental_license: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  requires_other_permits: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  }
}, {
  tableName: 'project_permits',
  timestamps: false
});

export default ProjectPermits;

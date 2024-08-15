import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const EnvironmentalManagement = sequelize.define('EnvironmentalManagement', {
  environmental_management_id: {
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
  environmental_management_department: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  responsible_staff: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  policies_guidelines: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  iso_certifications: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  legal_matrix: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  identified_impacts: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  complaints_mechanism: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  complies_with_regulations: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  environmental_supervision: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  public_communication: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  emergency_situations: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  sanctioned: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  environmental_liabilities: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  complaints: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  }
}, {
  tableName: 'environmental_management',
  timestamps: false
});

export default EnvironmentalManagement;

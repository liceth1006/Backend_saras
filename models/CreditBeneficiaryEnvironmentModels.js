import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const CreditBeneficiaryEnvironmentalInfo = sequelize.define('CreditBeneficiaryEnvironmentalInfo', {
  beneficiary_info_id: {
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
  debt_substitution: {
    type: DataTypes.ENUM('Yes', 'No', 'Not Applicable'),
    allowNull: true,
    defaultValue: 'Not Applicable'
  },
  has_environmental_department: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false,
    defaultValue: 'No'
  },
  has_environmental_policies: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false,
    defaultValue: 'No'
  },
  environmental_certifications: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  known_impacts: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  environmental_programs: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  legal_requirements_documented: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false,
    defaultValue: 'No'
  },
  public_communication: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false,
    defaultValue: 'No'
  },
  public_communication_details: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  supervision_activities: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false,
    defaultValue: 'No'
  },
  accident_emergency_management: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false,
    defaultValue: 'No'
  },
  labor_norms_compliance: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false,
    defaultValue: 'No'
  },
  grievance_mechanism: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false,
    defaultValue: 'No'
  },
  environmental_liabilities: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'credit_beneficiary_environmental_info',
  timestamps: false
});

export default CreditBeneficiaryEnvironmentalInfo;

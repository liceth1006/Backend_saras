import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const LaborConditions = sequelize.define('LaborConditions', {
  labor_conditions_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  bene_info_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'beneficiaries_information',
      key: 'bene_info_id'
    }
  },
  hiring_non_discriminatory: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  equal_labor_conditions: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  workers_know_rights: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  training_program: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  temporary_workers_min_salary: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  respect_union_agreements: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  foreign_workers_equal_conditions: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  accommodation_services_verified: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  forced_labor_trafficking_check: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  age_verification: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  child_labor_risk_management: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  work_permits_usage: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  pqr_mechanism: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  avoids_mass_terminations: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  individual_termination_compliance: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  accidents_incidents_recorded: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  workers_affiliated: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  workers_know_safety_hazards: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  emergency_procedures: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  emergency_instructions_clear: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  sg_sst_compliant: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  }
}, {
  tableName: 'labor_conditions',
  timestamps: false
});

export default LaborConditions;

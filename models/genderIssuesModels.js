import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const GenderIssues = sequelize.define('GenderIssues', {
  gender_issues_id: {
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
  discriminates_gender_benefits: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  sexual_abuse_reports: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  sexual_harassment_reports: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  discrimination_against_women_reports: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  discrimination_orientation_gender_reports: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  sexual_exploitation_reports: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  },
  lacks_gender_equality_policies: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: false
  }
}, {
  tableName: 'gender_issues',
  timestamps: false
});

export default GenderIssues;

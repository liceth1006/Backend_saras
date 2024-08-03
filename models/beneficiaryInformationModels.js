import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const BeneficiaryInformation = sequelize.define('BeneficiaryInformation', {
  bene_info_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  main_activity_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  secondary_activity_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  environmental_management: {
    type: DataTypes.STRING,
    allowNull: false
  },
  exc_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bene_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company_description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'beneficiary_information',
  timestamps: false
});

export default BeneficiaryInformation;

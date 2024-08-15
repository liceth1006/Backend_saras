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
    allowNull: false,
    references: {
      model: 'activities',
      key: 'acti_id'
    }
  },
  exc_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'exclusions',
      key: 'exc_id'
    }
  },
  bene_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'beneficiaries',
      key: 'bene_id'
    }
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resources: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  sector_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sectors',
      key: 'sector_id'
    }
  },

  credit_value: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },  
}, {
  tableName: 'beneficiaries_information',
  timestamps: false
});



export default BeneficiaryInformation;

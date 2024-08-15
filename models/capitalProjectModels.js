import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const CapitalProject = sequelize.define('CapitalProject', {
  capital_project_id: {
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
 
}, {
  tableName: 'capital_projects',
  timestamps: false
});

export default CapitalProject;

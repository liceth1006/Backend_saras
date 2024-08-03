
import { DataTypes } from 'sequelize';
import Person from './personModels.js';
import sequelize from '../database/connectdb.js';

const Beneficiary = sequelize.define('Beneficiary', {
  bene_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  per_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Person, 
      key: 'per_id'
    }
  }
}, {
  tableName: 'beneficiaries',
  timestamps: false, 
});

// Definir la relación entre Beneficiary y Person
Beneficiary.belongsTo(Person, { foreignKey: 'per_id', as: 'person' });

export default Beneficiary;


import { DataTypes } from 'sequelize';
import Person from './personModels.js';
import sequelize from '../database/connectdb.js';

const Employees = sequelize.define('Employees', {
  emp_id : {
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
  },
  emp_status:
  {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'employees',
  timestamps: false, 
});

// Definir la relación entre Beneficiary y Person
Employees.belongsTo(Person, { foreignKey: 'per_id', as: 'person' });

export default Employees;

import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const Permits = sequelize.define('Permits', {
  permit_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  capital_project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'capital_projects', // Ajusta el nombre del modelo según tu esquema
      key: 'capital_project_id'
    }
  },
  perm_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'environmental_permits',
      key: 'perm_id'
    }
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  resolution_number: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  resolution_year: {
    type: DataTypes.INTEGER, // YEAR no tiene un tipo equivalente directo en Sequelize, se usa INTEGER en su lugar
    allowNull: true
  },
  issuing_entity: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'permits',
  timestamps: false
});

export default Permits;

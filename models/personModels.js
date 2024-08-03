import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const Person = sequelize.define('Person', {
  per_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  per_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  per_lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  per_document: {
    type: DataTypes.STRING,
    allowNull: false
  },
  per_expedition: {
    type: DataTypes.DATE,
    allowNull: false
  },
  per_birthdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  doc_typ_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  use_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'use_id'
    }
  }
}, {
  tableName: 'persons',
  timestamps: false
});

export default Person;

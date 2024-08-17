import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const CommitmentEvaluation = sequelize.define('CommitmentEvaluation', {
  eval_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  emp_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bene_info_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  concept_as: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  commitments_established: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  alert_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  internal_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  account_executive: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  project_value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  credit_value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  inherent_category: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  international_banking: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  evaluation_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true, // Campo opcional
  },
}, {
  tableName: 'commitment_evaluations',
  timestamps: false,
});

export default CommitmentEvaluation;

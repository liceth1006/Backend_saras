import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const QuestionProjectType = sequelize.define('QuestionProjectType', {
  question_project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  bene_info_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'beneficiaries_information', 
    }
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  question_source: {
    type: DataTypes.ENUM('investment', 'working_capital'),
    allowNull: false,
    defaultValue: 'investment'
  }
}, {
  tableName: 'question_project_type',
  timestamps: false
});

export default QuestionProjectType;

import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const Project = sequelize.define('Project', {
  proj_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  proj_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  proj_description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total_project_value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estimated_value_financed: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  requires_environmental_license: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  bene_info_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'beneficiaries',
      key: 'bene_info_id'
    }
  },
  cat_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'cat_id'
    }
  }
}, {
  tableName: 'projects',
  timestamps: false
});

export default Project;

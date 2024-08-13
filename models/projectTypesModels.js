import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const ProjectTypes = sequelize.define('ProjectTypes', {
  project_types_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  type_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'project_types',
  timestamps: false
});

export default ProjectTypes;

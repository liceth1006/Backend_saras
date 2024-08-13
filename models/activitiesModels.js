import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const Activities = sequelize.define('Activities', {
  acti_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  acti_code: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  acti_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'activities',
  timestamps: false
});

export default Activities;

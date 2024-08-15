import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const Location = sequelize.define('Location', {
  location_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  location_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  location_department: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'location',
  timestamps: false
});

export default Location;

import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const SoilType = sequelize.define('SoilType', {
  soil_type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  soil_type_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'soil_types',
  timestamps: false
});

export default SoilType;

import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const LandUse = sequelize.define('LandUse', {
  land_use_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  land_use_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'land_uses',
  timestamps: false
});

export default LandUse;

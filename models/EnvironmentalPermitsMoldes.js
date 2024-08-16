import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const EnvironmentalPermits = sequelize.define('EnvironmentalPermits', {
  perm_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  perm_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'environmental_permits',
  timestamps: false
});

export default EnvironmentalPermits;

import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const Sectors = sequelize.define('Sectors', {
  sector_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  sector_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  }
}, {
  tableName: 'sector',
  timestamps: false
});

export default Sectors;

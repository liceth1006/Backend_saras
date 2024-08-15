import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const TypeCategory = sequelize.define('TypeCategory', {
  type_category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  type_category_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'type_categories',
  timestamps: false
});

export default TypeCategory;

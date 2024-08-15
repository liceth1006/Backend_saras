// Importa las dependencias necesarias
import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js'; 

// Define el modelo para la tabla areas_of_interest
const AreasOfInterest = sequelize.define('AreasOfInterest', {
  area_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  area_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'areas_of_interest',
  timestamps: false, 

});


export default AreasOfInterest;

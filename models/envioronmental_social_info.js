import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

    const environmental_social_info = sequelize.define('environmental_social_info', {
      env_soc_info_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      lic_typ_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resolution_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      proj_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
      }
    
      
},
{
  tableName:"environmental_social_info",
  timestamps:false
});

    export default environmental_social_info;
import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const comitments = sequelize.define('Comitment', {
    comitID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    estatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    tableName:"commitments",
    timestamps:false
});


  export default comitments;
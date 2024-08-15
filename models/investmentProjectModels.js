import { DataTypes } from 'sequelize';
import sequelize from '../database/connectdb.js';

const InvestmentProject = sequelize.define('InvestmentProject', {
  investment_project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  bene_info_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'beneficiaries_information', 
      key: 'bene_info_id'
    }
  },
  proj_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  phase: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  phase_percentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  total_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  total_project_value: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'location', 
      key: 'location_id'
    }
  },
  type_category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'type_categories',
      key: 'type_category_id'
    }
  },
  soil_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'soil_types', 
      key: 'soil_type_id'
    }
  },
  land_use_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'land_uses', 
      key: 'land_use_id'
    }
  },
  estimated_execution_time: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  area_or_length: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  consultation_procedure: {
    type: DataTypes.ENUM('Sí', 'No', 'No Aplica'),
    allowNull: true
  },
  public_access_studies: {
    type: DataTypes.ENUM('Sí', 'No', 'No Aplica'),
    allowNull: true
  }
}, {
  tableName: 'investment_projects',
  timestamps: false
});

export default InvestmentProject;

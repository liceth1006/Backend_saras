import { DataTypes } from "sequelize";
import sequelize from "../database/connectdb.js";

const Exclusions = sequelize.define(
  "Exclusions",
  {
    exc_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    exc_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "exclusions",
    timestamps: false,
  }
);

export default Exclusions;

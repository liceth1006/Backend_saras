import { DataTypes } from "sequelize";
import sequelize from "../database/connectdb.js";

const DocumentTypes = sequelize.define(
  "DocumentTypes",
  {
    doc_typ_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doc_typ_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
  },
  {
    tableName: "document_types",
    timestamps: false,
  }
);

export default DocumentTypes
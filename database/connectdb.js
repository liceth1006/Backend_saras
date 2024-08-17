import { Sequelize } from 'sequelize';
import 'dotenv/config';

//datos de conexion a la base de datos
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: "localhost",
  username: "root",
  password: "",
  database: "saras",
  port:"3307",
  logging: console.log
});

export default sequelize; 

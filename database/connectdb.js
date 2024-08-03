import { Sequelize } from 'sequelize';
import 'dotenv/config';

//datos de conexion a la base de datos
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: console.log
});

export default sequelize; 

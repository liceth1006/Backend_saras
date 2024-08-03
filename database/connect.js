import sequelize from './connectdb.js'; 

async function connectToDatabase() {
  try {
    await sequelize.authenticate(); 
    console.log('Conexión a MySQL exitosa 👏👏');

    // Sincroniza modelos con la base de datos
    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos.');

  } catch (error) {
    console.error('Error en las operaciones de la base de datos 😰😭', error);
    throw error; 
  }
}

export default connectToDatabase;
